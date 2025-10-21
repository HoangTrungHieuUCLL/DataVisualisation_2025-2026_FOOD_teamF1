import express, { NextFunction, Request, Response } from 'express';
import productService from '../service/product.service';

const productRouter = express.Router();

productRouter.get('/firstTenProducts', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const firstTenProducts = await productService.getFirstTenProducts();
        res.json(firstTenProducts);
    } catch (error) {
        next(error);
    }
});

export { productRouter };