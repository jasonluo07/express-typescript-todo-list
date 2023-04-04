import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import i18nMiddleware from './middlewares/i18nMiddleware';
import errorHandleingMiddleware from './middlewares/errorHandlingMiddleware';

import router from './routes';

dotenv.config(); // Load .env file

const app = express(); // Create express app

app.use(express.json()); // Parse JSON body

const allowedOrigins = ['http://localhost:3000']; // list of origins allow to access resources on server

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.use(i18nMiddleware); // Set i18n middleware
app.use(router); // Set router
app.use(errorHandleingMiddleware); // Set error handling middleware

export default app;
