import food_db from "../app";
import { Product } from "../model/product";
import { ProductInput } from "../types";

async function getFirstTenProducts(): Promise<Product[]> {
  const query = 'SELECT * FROM product LIMIT 10';
  try {
    const result = await food_db.query(query);
    return result.rows;
    
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
}

export default {
  getFirstTenProducts
};