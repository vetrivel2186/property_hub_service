import { Router } from "express";
import { createPropertyController, deletePropertyController, getAllPropertiesController, getPropertyByUserIdController, getPropertyController, updatePropertyController } from "./controller.js";
import { validate } from "../../middleware/validation.middleware.js";
import { createPropertySchema, updatePropertySchema } from "./validation.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const propertyRoutes = Router();

propertyRoutes.get("/getAllProperties",getAllPropertiesController);

propertyRoutes.get(
  "/getProperty/:id",
  getPropertyController
);
propertyRoutes.get(
  "/getPropertyByUserId",
  authMiddleware,
  getPropertyByUserIdController
);

propertyRoutes.post(
  "/insertProperty",
  authMiddleware,
  validate(createPropertySchema),
  createPropertyController
);

propertyRoutes.put(
  "/updateProperty/:id",
  authMiddleware,
  validate(updatePropertySchema),
  updatePropertyController
);

propertyRoutes.delete(
  "/deleteProperty/:id",
  authMiddleware,
  deletePropertyController
);


export default propertyRoutes;