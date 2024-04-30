import mongoose from "mongoose";

import { env } from "@/env";

const DATABASE_URL = env.DATABASE_URL;

const connectDatabase = async () => {
  await mongoose.connect(DATABASE_URL);
};

export { connectDatabase };
