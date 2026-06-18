import { eq, and } from "drizzle-orm";

import { db } from "../../db/index.js";

import { inquiries } from "../../db/schema/inquiry.schema.js";

export const createInquiry = async (
  data: typeof inquiries.$inferInsert
) => {
  const [inquiry] = await db
    .insert(inquiries)
    .values(data)
    .returning();

  return inquiry;
};

export const findDuplicateInquiry =
  async (
    propertyId: number,
    senderId: number
  ) => {
    const [inquiry] = await db
      .select()
      .from(inquiries)
      .where(
        and(
          eq(
            inquiries.propertyId,
            propertyId
          ),
          eq(
            inquiries.senderId,
            senderId
          )
        )
      );

    return inquiry;
  };

export const getOwnerInquiries =
  async (ownerId: number) => {
    return db
      .select()
      .from(inquiries)
      .where(
        eq(
          inquiries.ownerId,
          ownerId
        )
      );
  };
export const getSenderInquiries =
  async (senderId: number) => {
    return db
      .select()
      .from(inquiries)
      .where(
        eq(
          inquiries.senderId,
          senderId
        )
      );
  };