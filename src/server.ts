import app from './app';
import { Mongo } from './db';

(async function (): Promise<void> {
  try {
    await Mongo.connect();
    app.listen(process.env.PORT!, () => {
      console.info(`App listening on http://${process.env.HOST!}:${process.env.PORT!}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
