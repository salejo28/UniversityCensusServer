import cloudinary from "cloudinary";
import fs from "fs";

import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_NAME,
} from "keys";

cloudinary.v2.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export const UploadFile = async (filepath: string): Promise<string> => {
  try {
    const { url } = await cloudinary.v2.uploader.upload(filepath);
    fs.unlinkSync(filepath);
    return url;
  } catch (error) {
    throw new Error(error as string);
  }
};
