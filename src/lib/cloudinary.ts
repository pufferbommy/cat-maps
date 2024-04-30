import { env } from "@/env";
import { v2 as cdnr } from "cloudinary";

export const cloudinary = cdnr.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});
