import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL;

let cachedConnection: typeof mongoose;

async function connectDB() {
  if (!DATABASE_URL) {
    throw new Error(
      "Please define the DATABASE_URL environment variable inside .env.local"
    );
  }

  if (cachedConnection) return cachedConnection;

  const opts = {
    bufferCommands: false,
  };

  const connection = await mongoose.connect(DATABASE_URL, opts);

  cachedConnection = connection;

  return cachedConnection;
}

export { connectDB };
