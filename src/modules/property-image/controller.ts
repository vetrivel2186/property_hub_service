

import { asyncHandler } from "../../utils/async-handlers.js";
import {
  addPropertyImageService,
  getPropertyImagesService,
  deletePropertyImageService,
  updatePropertyImageService,
} from "./service.js";

export const addPropertyImageController =
  asyncHandler(async (req, res) => {
    const image =
      await addPropertyImageService(
        Number(req.params.propertyId),
        req.body,
      );

    res.status(201).json({
      success: true,
      data: image,
    });
  });

export const getPropertyImagesController =
  asyncHandler(async (req, res) => {
    const images =
      await getPropertyImagesService(
        Number(req.params.propertyId)
      );

    res.status(200).json({
      success: true,
      data: images,
    });
  });

export const deletePropertyImageController =
  asyncHandler(async (req, res) => {
    await deletePropertyImageService(
      Number(req.params.imageId)
    );

    res.status(200).json({
      success: true,
      message:
        "Image deleted successfully",
    });
  });
export const updatePropertyImageController =
  asyncHandler(async (req, res) => {
    await updatePropertyImageService(
      Number(req.params.imageId),req.body
    );

    res.status(200).json({
      success: true,
      message:
        "Image updated successfully",
    });
  });