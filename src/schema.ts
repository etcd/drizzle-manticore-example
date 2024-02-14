/**
 * Drizzle schema for an example `Posts` table. Usually, with Drizzle, running
 * `npm run db:push` will push the corresponding schema to the database over
 * any MySQL API. However, I haven't tested this yet. Instead, I manually
 * created this table in Manticore:
 *
 *   CREATE TABLE Post(
 *     user string,
 *     txt text,
 *     isDraft boolean,
 *   )
 *
 * Note: more complex Manticore table definitions are not possible to express
 * using Drizzle schema. For example, I don't think there's a way to specify
 * MVA columns, or pass parameters to, e.g., specify infix length or enable the
 * columnar library.
 *
 * The easy way to handle this is to keep a separate `schema.sql`, which stores
 * the actual schema, and map to an equivalent drizzle schema in `schema.ts`.
 *
 * The ideal way to handle this is to create a Drizzle table adapter for
 * Manticore.
 * */

import { boolean, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const posts = mysqlTable("Post", {
  id: int("id").notNull().primaryKey(),
  user: varchar("user", { length: 256 }),
  txt: varchar("txt", { length: 191 }).notNull(),
  isDraft: boolean("isDraft").default(true),
});
