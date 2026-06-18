import { eq } from "drizzle-orm";

import { db } from "../../db/index.js";
import { propertyImages } from "../../db/schema/property-image.schema.js";

export const createPropertyImage = async (
  propertyId: number,
  data: typeof propertyImages.$inferInsert[]
) => {
  const selectedNewPrimary =
    data.find(
      (image) => image.isPrimary
    );

  if (selectedNewPrimary) {

    await db
      .update(propertyImages)
      .set({
        isPrimary: false,
      })
      .where(
        eq(
          propertyImages.propertyId,
          propertyId
        )
      );

  }
  const [image] = await db
    .insert(propertyImages)
    .values(data)
    .returning();

  return image;
};

export const getPropertyImages = async (
  propertyId: number
) => {
  return db
    .select()
    .from(propertyImages)
    .where(
      eq(
        propertyImages.propertyId,
        propertyId
      )
    );
};

export const getImageById = async (
  imageId: number
) => {
  const [image] = await db
    .select()
    .from(propertyImages)
    .where(
      eq(propertyImages.id, imageId)
    );

  return image;
};

export const deletePropertyImage =
  async (imageId: number) => {
    const [image] = await db
      .delete(propertyImages)
      .where(
        eq(propertyImages.id, imageId)
      )
      .returning();

    return image;
  };


export const updatePropertyByImageId = async (imageId: number, propertyId: number, body: { isPrimary: boolean }) => {
  await db
    .update(propertyImages)
    .set({
      isPrimary: false,
    })
    .where(
      eq(
        propertyImages.propertyId,
        propertyId
      )
    );
  await db
    .update(propertyImages)
    .set({
      isPrimary: body.isPrimary,
    })
    .where(
      eq(
        propertyImages.id,
        imageId
      )
    );
}