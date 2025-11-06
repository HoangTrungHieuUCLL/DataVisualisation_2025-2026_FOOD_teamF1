import faicons as fa
import plotly.express as px

# Load data and compute static values
from shared import app_dir, tips, food_products
from shinywidgets import output_widget, render_plotly

from shiny import App, reactive, render, ui

bill_rng = (min(tips.total_bill), max(tips.total_bill))


ICONS = {
    "user": fa.icon_svg("user", "regular"),
    "wallet": fa.icon_svg("wallet"),
    "currency-dollar": fa.icon_svg("dollar-sign"),
    "ellipsis": fa.icon_svg("ellipsis"),
}

# Add page title and sidebar
app_ui = ui.page_sidebar(
    ui.sidebar(
        ui.input_slider(
            "total_bill",
            "Bill amount",
            min=bill_rng[0],
            max=bill_rng[1],
            value=bill_rng,
            pre="$",
        ),
        ui.input_checkbox_group(
            "time",
            "Food service",
            ["Lunch", "Dinner"],
            selected=["Lunch", "Dinner"],
            inline=True,
        ),
        ui.input_action_button("reset", "Reset filter"),
        open="desktop",
    ),
    # ui.layout_columns(
    #     ui.value_box(
    #         "Total tippers", ui.output_ui("total_tippers"), showcase=ICONS["user"]
    #     ),
    #     ui.value_box(
    #         "Average tip", ui.output_ui("average_tip"), showcase=ICONS["wallet"]
    #     ),
    #     ui.value_box(
    #         "Average bill",
    #         ui.output_ui("average_bill"),
    #         showcase=ICONS["currency-dollar"],
    #     ),
    #     fill=False,
    # ),
    ui.layout_columns(
        ui.value_box(
            "Total products", ui.output_ui("total_food_products"), showcase=ICONS["user"]
        ),
        ui.value_box(
            "Total merged products", ui.output_ui("total_merged_food_products"), showcase=ICONS["user"]
        ),
        ui.value_box(
            "Average energy", ui.output_ui("average_energy"), showcase=ICONS["user"]
        ),
        fill=False,
    ),
    ui.layout_columns(
        ui.card(
            ui.card_header("Incomplete products"),
            ui.output_data_frame("products_with_missing_data_table"),
            full_screen=True
        ),
        ui.card(
            ui.card_header("Choose the product and update the information"),
            ui.tags.div(
                ui.tags.button(
                    "Show HEy",
                    type="button",
                    onclick="document.getElementById('hey-output').innerText = 'HEy';",
                    class_="btn btn-primary",
                ),
                ui.tags.div(id="hey-output", style="marginTop: '.5rem'; fontWeight: '600'"),
            ),
            full_screen=True,
        )
    ),
    # ui.layout_columns(
    #     ui.card(
    #         ui.card_header("Tips data"), ui.output_data_frame("table"), full_screen=True
    #     ),
    #     ui.card(
    #         ui.card_header(
    #             "Total bill vs tip",
    #             ui.popover(
    #                 ICONS["ellipsis"],
    #                 ui.input_radio_buttons(
    #                     "scatter_color",
    #                     None,
    #                     ["none", "sex", "smoker", "day", "time"],
    #                     inline=True,
    #                 ),
    #                 title="Add a color variable",
    #                 placement="top",
    #             ),
    #             class_="d-flex justify-content-between align-items-center",
    #         ),
    #         output_widget("scatterplot"),
    #         full_screen=True,
    #     ),
    #     ui.card(
    #         ui.card_header(
    #             "Tip percentages",
    #             ui.popover(
    #                 ICONS["ellipsis"],
    #                 ui.input_radio_buttons(
    #                     "tip_perc_y",
    #                     "Split by:",
    #                     ["sex", "smoker", "day", "time"],
    #                     selected="day",
    #                     inline=True,
    #                 ),
    #                 title="Add a color variable",
    #             ),
    #             class_="d-flex justify-content-between align-items-center",
    #         ),
    #         output_widget("tip_perc"),
    #         full_screen=True,
    #     ),
    #     col_widths=[6, 6, 12],
    # ),
    ui.include_css(app_dir / "styles.css"),
    title="Food products",
    fillable=True,
)


def server(input, output, session):
    @render.ui
    def total_food_products():
        return food_products.shape[0]
    
    @render.ui
    def total_merged_food_products():
        return food_products[food_products['merged_to'].notna()].shape[0]
    
    @render.ui
    def average_energy():
        # compute average energy, treating missing values as 0.0
        val = food_products['energy'].fillna(0.0).mean()
        return f"{val:.2f}"
    
    @reactive.calc
    def tips_data():
        bill = input.total_bill()
        idx1 = tips.total_bill.between(bill[0], bill[1])
        idx2 = tips.time.isin(input.time())
        return tips[idx1 & idx2]

    @render.ui
    def total_tippers():
        return tips_data().shape[0]

    @render.ui
    def average_tip():
        d = tips_data()
        if d.shape[0] > 0:
            perc = d.tip / d.total_bill
            return f"{perc.mean():.1%}"

    @render.ui
    def average_bill():
        d = tips_data()
        if d.shape[0] > 0:
            bill = d.total_bill.mean()
            return f"${bill:.2f}"

    @render.data_frame
    def products_with_missing_data_table():
        NUTRITION_VALUES_COLUMNS = [
            'energy', 'protein', 'fat', 'saturated_fatty_acid','carbohydrates',
            'sugar', 'starch', 'dietary_fiber', 'salt', 'sodium', 'k', 'ca',
            'p', 'fe', 'polyols', 'remarks_carbohydrates', 'categories'
        ]
        
        incomplete_products = food_products[food_products[NUTRITION_VALUES_COLUMNS].isnull().any(axis=1)]
        
        incomplete_products_brief_columns = incomplete_products[['id', 'name', 'active', 'brands', 'categories', 'barcode']]

        return render.DataGrid(incomplete_products_brief_columns)

    @render_plotly
    def scatterplot():
        color = input.scatter_color()
        return px.scatter(
            tips_data(),
            x="total_bill",
            y="tip",
            color=None if color == "none" else color,
            trendline="lowess",
        )

    @render_plotly
    def tip_perc():
        from ridgeplot import ridgeplot

        dat = tips_data()
        dat["percent"] = dat.tip / dat.total_bill
        yvar = input.tip_perc_y()
        uvals = dat[yvar].unique()

        samples = [[dat.percent[dat[yvar] == val]] for val in uvals]

        plt = ridgeplot(
            samples=samples,
            labels=uvals,
            bandwidth=0.01,
            colorscale="viridis",
            colormode="row-index",
        )

        plt.update_layout(
            legend=dict(
                orientation="h", yanchor="bottom", y=1.02, xanchor="center", x=0.5
            )
        )

        return plt

    @reactive.effect
    @reactive.event(input.reset)
    def _():
        ui.update_slider("total_bill", value=bill_rng)
        ui.update_checkbox_group("time", selected=["Lunch", "Dinner"])


app = App(app_ui, server)
