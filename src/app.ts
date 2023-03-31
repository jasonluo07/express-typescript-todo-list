import dotenv from 'dotenv';
import express from 'express';
import i18nMiddleware from './middlewares/i18nMiddleware';

import router from './routes';

dotenv.config(); // 載入 .env 檔案

const app = express();

app.use(express.json()); // 解析 json 格式的 req.body
app.use(i18nMiddleware); // 設定多語系
app.use(router); // 設定路由器

export default app;
