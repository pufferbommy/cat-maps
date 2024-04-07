import mongoose, { ConnectOptions } from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL;

const connectDB = async () => {
  if (!DATABASE_URL) {
    throw new Error(
      "Please define the DATABASE_URL environment variable inside .env.local"
    );
  }

  const opts: ConnectOptions = {
    bufferCommands: false,
  };

  await mongoose.connect(DATABASE_URL, opts);
};

export { connectDB };
