import dotenv from 'dotenv';
import express from 'express';
import i18n from './middlewares/i18nMiddleware';

import router from './routes';

dotenv.config();

const app = express();

app.use(express.json()); // 解析 json 格式的 req.body
app.use(i18n); // 設定多語系
app.use(router); // 設置路由器

export default app;
