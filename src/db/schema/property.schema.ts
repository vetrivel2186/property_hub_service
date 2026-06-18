import { index, integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "./user.schema.js";
import { relations } from "drizzle-orm";
import { propertyImages } from "./property-image.schema.js";
import { inquiries } from "./inquiry.schema.js";

export const properties = pgTable("properties", {

    id: serial("id").primaryKey(),

    userId: integer("user_id").notNull().references(() => users.id, {
        onDelete: "cascade"
    }),

    title: varchar("title", { length: 255 }).notNull(),

    description: text("description").notNull(),

    propertyType: varchar("property_type", { length: 100 }).notNull(),

    city: varchar("city", { length: 255 }).notNull(),

    price: integer("price").notNull(),

    bedrooms: integer("bedrooms").notNull(),

    bathrooms: integer("bathrooms").notNull(),

    areaSqft: integer("area_sqft").notNull(),

    status: varchar("status", { length: 50 }).default("active").notNull(),

    primaryImageUrl: text("primary_image_url"),
    
    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at").defaultNow().notNull(),
},
    (table) => ({
        cityIdx: index("city_idx").on(table.city),

        typeIdx: index("type_idx").on(table.propertyType),

        priceIdx: index("price_idx").on(table.price)

    })
)

export const propertyRelation = relations(properties, ({ one, many }) => ({
    user: one(users, {
        fields: [properties.userId],
        references: [users.id]
    }),

    images: many(propertyImages),

    inquiries: many(inquiries)

}))