import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import i18nMiddleware from './middlewares/i18nMiddleware';
import errorHandleingMiddleware from './middlewares/errorHandlingMiddleware';
import corsOptions from './config/corsOptions';

import router from './routes';

dotenv.config(); // Load .env file

const app = express(); // Create express app

app.use(express.json()); // Parse JSON body

app.use(cors(corsOptions));
app.use(i18nMiddleware); // Set i18n middleware
app.use(router); // Set router
app.use(errorHandleingMiddleware); // Set error handling middleware

export default app;
