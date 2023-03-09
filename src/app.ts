import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './database';
import router from './routes';

dotenv.config();

const app = express();
const HOST = process.env.HOST ?? 'localhost';
const PORT = process.env.PORT ?? '3000';

app.use(express.json()); // 解析 json 格式的 req.body
app.use(router); // 設置路由器

async function startApp() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.info(`App listening on http://${HOST}:${PORT}`);
    });
  } catch (err) {
    console.error(`Database connection error: ${err}`);
    process.exit(1);
  }
}

startApp();
