from pathlib import Path

import pandas as pd

app_dir = Path(__file__).parent
tips = pd.read_csv(app_dir / "tips.csv")
food_products = pd.read_csv(app_dir / "view_food_clean.csv")
