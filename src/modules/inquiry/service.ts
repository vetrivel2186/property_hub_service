
import { getPropertyById } from "../properties/repository.js";
import { createInquiry, findDuplicateInquiry, getOwnerInquiries, getSenderInquiries } from "./repository.js";

export const createInquiryService =
  async (
    senderId: number,
    
    body:{name:string,email:string,propertyId: number,message:string}
  ) => {
    const property =
      await getPropertyById(
        
        body.propertyId
      );

    if (!property) {
      throw new Error(
        "Property not found"
      );
    }

    if (
      property.userId === senderId
    ) {
      throw new Error(
        "You cannot inquire about your own property"
      );
    }

    const existingInquiry =
      await findDuplicateInquiry(
        body.propertyId,
        senderId
      );

    if (existingInquiry) {
      throw new Error(
        "Inquiry already submitted"
      );
    }

    await createInquiry({
      propertyId:body.propertyId,
      senderId,
      ownerId: property.userId,
      name: body.name,
      email: body.email,
     message:body.message,
    });
  };

export const getMyInquiriesService =
  async (ownerId: number) => {
    return getOwnerInquiries(
      ownerId
    );
  };
export const getSenderInquiryService =
  async (senderId: number) => {
    return getSenderInquiries(
      senderId
    );
  };