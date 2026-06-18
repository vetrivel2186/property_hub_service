import cloudinary from "../../config/cloudinary.js";
import type{ UploadApiResponse } from "cloudinary";

export const uploadImageService = (
  file: Express.Multer.File
) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "propertyhub",
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          resolve(result);
        }
      )
      .end(file.buffer);
  });
};


export const uploadMultipleImagesService = async (
   file: Express.Multer.File
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "propertyhub",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result!);
        }
      )
      .end(file.buffer);
  });
};