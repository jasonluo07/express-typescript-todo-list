import mongoose from 'mongoose';

async function connectDB() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MongoDB connection error: MONGODB_URI not set');
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.info('MongoDB connected');
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(1);
  }
}

async function disconnectDB() {
  try {
    await mongoose.disconnect();
    console.info('MongoDB disconnected');
  } catch (err) {
    console.error(`MongoDB disconnection error: ${err}`);
    process.exit(1);
  }
}

export { connectDB, disconnectDB };
