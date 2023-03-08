import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const HOST = process.env.HOST || 'localhost';
const PORT = parseInt(process.env.PORT || '3000');

app.get('/', (_req, res) => {
  res.status(200).json({ status: 'success', message: 'Hello World!' });
});

app.listen(PORT, () => {
  console.log(`App listening on port http://${HOST}:${PORT}`);
});
