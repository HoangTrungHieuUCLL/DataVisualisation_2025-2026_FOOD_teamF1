import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Pool } from 'pg';
// import cron from 'node-cron';
// import { eventRouter } from './controller/event.routes';
// import { userRouter } from './controller/user.routes';
import { productRouter } from './controller/product.routes';


const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Connection to database
const food_db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

async function verifyConnection(): Promise<void> {
  try {
    // Attempt to acquire a client from the pool
    const client = await food_db.connect();
    console.log('✅ Connected to PostgreSQL database');
    client.release(); // Release the client back to the pool
  } catch (error) {
    console.error('❌ Error connecting to the database:', error);
  }
};

verifyConnection();
export default food_db;

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Events API',
            version: '1.0.0',
            description: 'API for managing events',
        },
    },
    apis: ['./controller/*.routes.ts'], // Pad naar je routebestanden met Swagger-documentatie
};


const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/project-swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get('/status', (req: Request, res: Response) => {
    res.json({ message: 'Back-end is running...' });
});


// app.use('/events', eventRouter);
// app.use('/users', userRouter);
app.use('/products', productRouter);


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ status: 'error', message: err.message });
});


app.listen(port, () => {
    console.log(`Back-end is running on port ${port}.`);
});