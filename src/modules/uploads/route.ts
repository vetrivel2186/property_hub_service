import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { upload } from "../../middleware/upload.middleware.js";
import { uploadPropertyImageController, uploadPropertyMultipleImageController } from "./controller.js";


const uploadRoutes = Router();

uploadRoutes.post(
  "/property-image-upload",
  authMiddleware,
  upload.single("image"),
  uploadPropertyImageController
);

uploadRoutes.post(
  "/property-image-multiple-upload",
  authMiddleware,
  upload.array("images", 10), // max 10 files
  uploadPropertyMultipleImageController
);
export default uploadRoutes;