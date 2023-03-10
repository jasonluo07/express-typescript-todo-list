import { connectDB } from './database';
import app from './app';

const HOST = process.env.HOST ?? 'localhost';
const PORT = process.env.PORT ?? '3000';

(async function startApp() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.info(`App listening on http://${HOST}:${PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
