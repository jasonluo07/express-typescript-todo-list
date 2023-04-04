import dotenv from 'dotenv';
import express from 'express';
import i18nMiddleware from './middlewares/i18nMiddleware';

import router from './routes';

dotenv.config(); // Load .env file

const app = express(); // Create express app

app.use(express.json()); // Parse JSON body
app.use(i18nMiddleware); // Set i18n middleware
app.use(router); // Set router

export default app;
