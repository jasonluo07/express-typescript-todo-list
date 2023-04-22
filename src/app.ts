import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import corsOptions from './configs/corsOptions';
import { errorMiddleware, i18nMiddleware } from './middlewares';
import router from './routes';

dotenv.config(); // Load .env file

const app = express(); // Create express app

app.use(express.json()); // Parse JSON body

app.use(cors(corsOptions));
app.use(i18nMiddleware); // Set i18n middleware
app.use(router); // Set router
app.use(errorMiddleware); // Set error handling middleware

export default app;
