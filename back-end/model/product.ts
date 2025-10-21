export class Product {
    readonly id?: number;
    readonly name: string;
    readonly nameSearch?: string;
    readonly active: boolean;
    readonly energy?: number;
    readonly protein?: number;
    readonly fat?: number;
    readonly saturatedFattyAcid?: number;
    readonly carbohydrates?: number;
    readonly sugar?: number;
    readonly starch?: number;
    readonly dietaryFiber?: number;
    readonly salt?: number;
    readonly sodium?: number;
    readonly k?: number;
    readonly ca?: number;
    readonly p?: number;
    readonly fe?: number;
    readonly polyols?: number;
    readonly remarks?: string;
    readonly cholesterol?: number;
    readonly omega6?: number;
    readonly omega3?: number;
    readonly mov?: number;
    readonly eov?: number;
    readonly vitD?: number;
    readonly vitC?: number;
    readonly vitB12?: number;
    readonly vitB6?: number;
    readonly vitB2?: number;
    readonly vitB1?: number;
    readonly vitA?: number;
    readonly mg?: number;
    readonly water?: number;
    readonly isFood?: boolean;
    readonly remarksCarbohydrates?: string;
    readonly hash?: string;
    readonly userStudyId?: number;
    readonly unit?: string;
    readonly synonyms?: string;
    readonly brands?: string;
    readonly brandsSearch?: string;
    readonly glucose?: number;
    readonly fructose?: number;
    readonly excessFructose?: number;
    readonly lactose?: number;
    readonly sorbitol?: number;
    readonly mannitol?: number;
    readonly fructans?: number;
    readonly gos?: number;
    readonly token?: string;
    readonly tokenDeleted?: string;
    readonly bron?: string;
    readonly userId?: number;
    readonly deleted?: boolean;
    readonly categories?: string;
    readonly barcode?: string;
    readonly mergedTo?: number;
    readonly created?: Date;
    readonly updated?: Date;
    readonly appVer?: string;

    constructor(product: {
        id?: number;
        name: string;
        nameSearch?: string;
        active: boolean;
        energy?: number;
        protein?: number;
        fat?: number;
        saturatedFattyAcid?: number;
        carbohydrates?: number;
        sugar?: number;
        starch?: number;
        dietaryFiber?: number;
        salt?: number;
        sodium?: number;
        k?: number;
        ca?: number;
        p?: number;
        fe?: number;
        polyols?: number;
        remarks?: string;
        cholesterol?: number;
        omega6?: number;
        omega3?: number;
        mov?: number;
        eov?: number;
        vitD?: number;
        vitC?: number;
        vitB12?: number;
        vitB6?: number;
        vitB2?: number;
        vitB1?: number;
        vitA?: number;
        mg?: number;
        water?: number;
        isFood?: boolean;
        remarksCarbohydrates?: string;
        hash?: string;
        userStudyId?: number;
        unit?: string;
        synonyms?: string;
        brands?: string;
        brandsSearch?: string;
        glucose?: number;
        fructose?: number;
        excessFructose?: number;
        lactose?: number;
        sorbitol?: number;
        mannitol?: number;
        fructans?: number;
        gos?: number;
        token?: string;
        tokenDeleted?: string;
        bron?: string;
        userId?: number;
        deleted?: boolean;
        categories?: string;
        barcode?: string;
        mergedTo?: number;
        created?: Date | string;
        updated?: Date | string;
        appVer?: string;
    }) {
        // if (!product.name) throw new Error("Product name cannot be empty");

        this.id = product.id;
        this.name = product.name;
        this.nameSearch = product.nameSearch;
        this.active = product.active;
        this.energy = product.energy;
        this.protein = product.protein;
        this.fat = product.fat;
        this.saturatedFattyAcid = product.saturatedFattyAcid;
        this.carbohydrates = product.carbohydrates;
        this.sugar = product.sugar;
        this.starch = product.starch;
        this.dietaryFiber = product.dietaryFiber;
        this.salt = product.salt;
        this.sodium = product.sodium;
        this.k = product.k;
        this.ca = product.ca;
        this.p = product.p;
        this.fe = product.fe;
        this.polyols = product.polyols;
        this.remarks = product.remarks;
        this.cholesterol = product.cholesterol;
        this.omega6 = product.omega6;
        this.omega3 = product.omega3;
        this.mov = product.mov;
        this.eov = product.eov;
        this.vitD = product.vitD;
        this.vitC = product.vitC;
        this.vitB12 = product.vitB12;
        this.vitB6 = product.vitB6;
        this.vitB2 = product.vitB2;
        this.vitB1 = product.vitB1;
        this.vitA = product.vitA;
        this.mg = product.mg;
        this.water = product.water;
        this.isFood = product.isFood;
        this.remarksCarbohydrates = product.remarksCarbohydrates;
        this.hash = product.hash;
        this.userStudyId = product.userStudyId;
        this.unit = product.unit;
        this.synonyms = product.synonyms;
        this.brands = product.brands;
        this.brandsSearch = product.brandsSearch;
        this.glucose = product.glucose;
        this.fructose = product.fructose;
        this.excessFructose = product.excessFructose;
        this.lactose = product.lactose;
        this.sorbitol = product.sorbitol;
        this.mannitol = product.mannitol;
        this.fructans = product.fructans;
        this.gos = product.gos;
        this.token = product.token;
        this.tokenDeleted = product.tokenDeleted;
        this.bron = product.bron;
        this.userId = product.userId;
        this.deleted = product.deleted;
        this.categories = product.categories;
        this.barcode = product.barcode;
        this.mergedTo = product.mergedTo;
        this.created = product.created ? new Date(product.created) : undefined;
        this.updated = product.updated ? new Date(product.updated) : undefined;
        this.appVer = product.appVer;
    }

    getId(): number | undefined {
        if (this.id === undefined) throw new Error("Product has no ID");
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getCategory(): string | undefined {
        return this.categories;
    }

    isActive(): boolean {
        return this.active;
    }

    equals(other: Product): boolean {
        return (
            this.name === other.getName() &&
            this.energy === other.energy &&
            this.protein === other.protein &&
            this.fat === other.fat &&
            this.barcode === other.barcode
        );
    }
}
