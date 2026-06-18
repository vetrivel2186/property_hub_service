import * as propertyImageRepository from "./repository.js";

import { getPropertyById } from "../properties/repository.js";

export const addPropertyImageService =
  async (
    propertyId: number,
     images: {
      imageUrl: string;
      isPrimary?: boolean;
    }[]
  ) => {
    const property =
      await getPropertyById(propertyId);

    if (!property) {
      throw new Error(
        "Property not found"
      );
    }
     const primaryImages =
      images.filter(
        (image) =>
          image.isPrimary === true
      );
 if (primaryImages.length > 1) {
      throw new Error(
        "Only one primary image is allowed"
      );
    }

    const imageRecords =
      images.map((image) => ({
        propertyId,
        imageUrl: image.imageUrl,
        isPrimary:
          image.isPrimary ?? false,
      }));

    return propertyImageRepository.createPropertyImage(
      propertyId,
      imageRecords
    );
  };

export const getPropertyImagesService =
  async (propertyId: number) => {
    return propertyImageRepository.getPropertyImages(
      propertyId
    );
  };

export const deletePropertyImageService =
  async (imageId: number) => {
    const image =
      await propertyImageRepository.getImageById(
        imageId
      );

    if (!image) {
      throw new Error(
        "Image not found"
      );
    }

    return propertyImageRepository.deletePropertyImage(
      imageId
    );
  };
export const updatePropertyImageService =
  async (imageId: number,body:{isPrimary:boolean}) => {
    const image =
      await propertyImageRepository.getImageById(
        imageId
      );

    if (!image) {
      throw new Error(
        "Image not found"
      );
    }

    return propertyImageRepository.updatePropertyByImageId(
      imageId,image.propertyId,body
    );
  };