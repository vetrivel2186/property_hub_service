import {
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./user.schema.js";
import { properties } from "./property.schema.js";

export const inquiries = pgTable(
  "inquiries",
  {
    id: serial("id").primaryKey(),

    propertyId: integer("property_id")
      .notNull()
      .references(() => properties.id, {
        onDelete: "cascade",
      }),

    senderId: integer("sender_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    ownerId: integer("owner_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    name: varchar("name", { length: 255 }).notNull(),

    email: varchar("email", { length: 255 }).notNull(),

    message: text("message").notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    uniquePropertySender:
      uniqueIndex(
        "inquiries_property_sender_unique"
      ).on(
        table.propertyId,
        table.senderId
      ),

    senderIndex:
      index(
        "inquiries_sender_idx"
      ).on(table.senderId),

    ownerIndex:
      index(
        "inquiries_owner_idx"
      ).on(table.ownerId),
  })
);