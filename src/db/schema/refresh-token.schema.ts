import { index, integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "./user.schema.js";
import { relations } from "drizzle-orm";

export const RefreshTokens = pgTable("refresh_tokens", {
    id: serial("id").primaryKey(),

    userId: integer("user_id").notNull().references(() => users.id, {
        onDelete: "cascade"
    }),

    token: text("token").notNull(),

    expiresAt: timestamp("expires_at", {
        withTimezone: true
    }).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
},
    (table) => ({
        userIndex: index("refresh_token_user_id_idx").on(table.userId)
    }))

export const refreshTokenRelation = relations(RefreshTokens, ({ one }) => ({
    user: one(users, {
        fields: [RefreshTokens.userId],
        references: [users.id]
    })
}))