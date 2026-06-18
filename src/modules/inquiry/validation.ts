import { z } from "zod";

export const createInquirySchema =
  z.object({
    propertyId: z.number(),

    name: z
      .string()
      .min(2, "Name is required"),

    email: z
      .email("Invalid email"),

    message: z
      .string()
      .min(
        10,
        "Message must be at least 10 characters"
      ),
  });