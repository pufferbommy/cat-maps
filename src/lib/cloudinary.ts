import { env } from "@/env";
import { v2 as _cloudinary } from "cloudinary";

export const configCloudinary = () => {
  _cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    secure: true,
  });
};

export const cloudinary = _cloudinary;
