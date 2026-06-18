import { z } from "zod";

export const addPropertyImagesSchema =
  z.object({
    images: z
      .array(
        z.object({
          imageUrl:
            z.string().url(),

          isPrimary:
            z.boolean().optional(),
        })
      )
      .min(1),
  });