import { z } from "zod";

export const createPropertySchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(255),

  description: z
    .string()
    .min(10, "Description is required"),

  //   propertyType: z.enum([
  //     "Apartment",
  //     "Villa",
  //     "Plot",
  //     "Commercial",
  //   ]),
  propertyType: z.string()
    .min(3, "Property type must be at least 3 characters")
    .max(100),

  city: z
    .string()
    .min(2, "City is required"),

  price: z
    .number()
    .positive(),

  bedrooms: z
    .number()
    .min(1),

  bathrooms: z
    .number()
    .min(1),

  areaSqft: z
    .number()
    .positive(),

  status: z.enum(["active", "inactive"]).optional(),
  primaryImageUrl: z.string().url().optional()
});

export const updatePropertySchema =
  createPropertySchema.partial();