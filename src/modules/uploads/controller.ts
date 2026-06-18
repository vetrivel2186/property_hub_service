import type{ Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handlers.js";
import { uploadImageService } from "./service.js";

export const uploadPropertyImageController =
  asyncHandler(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }
 console.log(req.file)
    const result: any =
      await uploadImageService(req.file);

    res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
      message: "Image uploaded successfully"
    });
  });

export const uploadPropertyMultipleImageController = asyncHandler(
  async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];

    if (!files?.length) {
      return res.status(400).json({
        success: false,
        message: "No images uploaded",
      });
    }

    const uploadedImages = await Promise.all(
      files.map((file) => uploadImageService(file))
    );

    return res.status(200).json({
      success: true,
      count: uploadedImages.length,
      images: uploadedImages.map((image: any) => ({
        url: image.secure_url,
        publicId: image.public_id,
      })),
    });
  }
);