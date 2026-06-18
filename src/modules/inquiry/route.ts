import { Router } from "express";
import {
  createInquiryController,
  getMyInquiriesController,
  getSenderInquiryController,
} from "./controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validation.middleware.js";
import { createInquirySchema } from "./validation.js";
import { getSenderInquiries } from "./repository.js";



const inquiryRoutes = Router();

inquiryRoutes.post(
  "/insert-inquiry",
  authMiddleware,
  validate(
    createInquirySchema
  ),
  createInquiryController
);

inquiryRoutes.get(
  "/received",
  authMiddleware,
  getMyInquiriesController
);
inquiryRoutes.get(
  "/sent",
  authMiddleware,
  getSenderInquiryController
);

export default inquiryRoutes;