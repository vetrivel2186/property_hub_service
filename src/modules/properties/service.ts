import { deleteProperty, getAllProperties, getPropertyById, getPropertyByUserId, insertProperty, updateProperty } from "./repository.js";

export const getPropertiesService =
  async (filters:any) => {
    return getAllProperties(filters);
  };

export const createPropertyService =
    async (
        userId: number,
        payload: any
    ) => {
        return insertProperty({
            ...payload,
            userId,
        });
    };

export const getPropertyService =
    async (propertyId: number) => {
        const property =
            await getPropertyById(
                propertyId
            );

        if (!property) {
            throw new Error("Property not found");
        }

        return property;
    };
export const getPropertyByUserIdService =
    async (userId: number) => {
        const property =
            await getPropertyByUserId(
                userId
            );

        if (!property) {
            throw new Error("Property not found");
        }

        return property;
    };

export const updatePropertyService =
    async (
        propertyId: number,
        userId: number,
        payload: any
    ) => {
        const property =
            await getPropertyById(
                propertyId
            );

        if (!property) {
            throw new Error("Property not found");
        }

        if (property.userId !== userId) {
            throw new Error(
                "You are not allowed to update this property"
            );
        }

        return updateProperty(
            propertyId,
            payload
        );
    };

export const deletePropertyService =
    async (
        propertyId: number,
        userId: number
    ) => {
        const property =
            await getPropertyById(
                propertyId
            );

        if (!property) {
            throw new Error("Property not found");
        }

        if (property.userId !== userId) {
            throw new Error(
                "You are not allowed to delete this property"
            );
        }

        return deleteProperty(
            propertyId
        );
    };