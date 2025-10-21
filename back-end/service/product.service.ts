import productDb from "../repository/product.db";
import { Product } from "../model/product";

const getFirstTenProducts = async (): Promise<Product[]> => {
    const firstTenProducts = await productDb.getFirstTenProducts();
    return firstTenProducts;
}

export default {
    getFirstTenProducts,
};