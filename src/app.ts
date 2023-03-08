import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './database';

dotenv.config();

const app = express();
const HOST = process.env.HOST ?? 'localhost';
const PORT = process.env.PORT ?? '3000';

app.get('/', (_req, res) => {
  res.status(200).json({ status: 'success', message: 'Hello World!' });
});

async function startApp() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.info(`App listening on http://${HOST}:${PORT}`);
    });
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
}

startApp();
