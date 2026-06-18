import { boolean, index, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { properties } from "./property.schema.js";
import { relations } from "drizzle-orm";

export const propertyImages = pgTable("property_images", {

    id: serial("id").primaryKey(),

    propertyId: integer("property_id").notNull().references(() => properties.id, {
        onDelete: "cascade"
    }),

    imageUrl: text("image_url").notNull(),

    isPrimary: boolean("is_primary").default(false).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
},
    (table) => ({
        propertyIdx: index("property_idx").on(table.propertyId)

    })
)

export const propertyImageRelation = relations(propertyImages, ({ one }) => ({
    property: one(properties, {
        fields: [propertyImages.propertyId],
        references: [properties.id]
    })
}))