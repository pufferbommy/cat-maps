import mongoose, { ConnectOptions } from "mongoose";

import { env } from "@/env";

const DATABASE_URL = env.DATABASE_URL;

const connectDatabase = async () => {
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

export { connectDatabase };
