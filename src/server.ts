import database from './database';
import app from './app';

(async () => {
  try {
    await database.connectDB();
    app.listen(process.env.PORT!, () => {
      console.info(`App listening on http://${process.env.HOST!}:${process.env.PORT!}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
