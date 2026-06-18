import { relations } from "drizzle-orm";
import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { properties } from "./property.schema.js";
import { inquiries } from "./inquiry.schema.js";

export const users = pgTable("users", {

    id: serial("id").primaryKey(),

    name: varchar("name", { length: 150 }).notNull(),

    email: varchar("email", { length: 255 }).notNull().unique(),

    passwordHash: varchar("password_hash", { length: 255 }).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const userRelation = relations(users, ({ many }) => ({
    properties: many(properties),
    sentInquiries: many(inquiries, {
        relationName: "sent_inquiries"
    }),
    receivedInquiries: many(inquiries, {
        relationName: "received_inquiries"
    })
}))