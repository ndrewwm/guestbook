import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
});

// export type InsertUser = typeof usersTable.$inferInsert;
// export type SelectUser = typeof usersTable.$inferSelect;


export const eventsTable = sqliteTable("events", {
  id: integer('id').primaryKey({ autoIncrement: true }),
  user_id: integer('user_id'),
  name: text('name').notNull(),
  sdt: text('sdt').notNull(),
  edt: text('edt').notNull(),
  color: text('color').notNull(),
});

export type InsertEvent = typeof eventsTable.$inferInsert;
export type SelectEvent = typeof eventsTable.$inferSelect;
