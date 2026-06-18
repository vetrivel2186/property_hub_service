import { Router } from "express";

import {
  addPropertyImageController,
  getPropertyImagesController,
  deletePropertyImageController,
  updatePropertyImageController,
} from "./controller.js";

import { authMiddleware } from "../../middleware/auth.middleware.js";

const propertyImageRoutes = Router();

propertyImageRoutes.post(
  "/insertPropertyImage/:propertyId",
  authMiddleware,
  addPropertyImageController
);

propertyImageRoutes.get(
  "/getPropertyImage/:propertyId",
  getPropertyImagesController
);
propertyImageRoutes.put(
  "/updatePropertyImage/:imageId",
  updatePropertyImageController
);

propertyImageRoutes.delete(
  "/deletePropertyImage/:imageId",
  authMiddleware,
  deletePropertyImageController
);

export default propertyImageRoutes;