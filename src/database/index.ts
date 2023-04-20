import mongoose from 'mongoose';

async function connect(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.info('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

async function disconnect(): Promise<void> {
  try {
    await mongoose.disconnect();
    console.info('MongoDB disconnected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

export default { connect, disconnect };
