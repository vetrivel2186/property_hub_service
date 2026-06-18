import cors from 'cors';
import express from 'express';
import swaggerUi from "swagger-ui-express";
import { errorMiddleware } from './middleware/error.middleware.js';
import authRoutes from './modules/auth/route.js';
import inquiryRoutes from './modules/inquiry/route.js';
import propertyRoutes from './modules/properties/route.js';
import propertyImageRoutes from './modules/property-image/route.js';
import uploadRoutes from './modules/uploads/route.js';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(`/api/v1/auth`, authRoutes);
app.use("/api/v1/property", propertyRoutes);
app.use("/api/v1/uploads", uploadRoutes);
app.use("/api/v1/property-images",propertyImageRoutes);
app.use("/api/v1/inquiry",inquiryRoutes);
app.use(errorMiddleware);

export default app;