import { and, count, eq, sql } from "drizzle-orm";
import { db, executeQuery, stringOfQuery } from "./dbClient";
import { posts } from "./schema";
import { loremIpsum } from "./loremIpsum";

/**
 * Inserts single example post.
 */
const insertSingleQuery = db
  .insert(posts)
  .values({
    id: 1,
    txt: "lorem ipsum",
    user: "alice",
    isDraft: false,
  })
  .toSQL();
console.log(`[Insert single]\n${stringOfQuery(insertSingleQuery)}\n`);
await executeQuery(insertSingleQuery);

/**
 * Inserts single example post with default draft value.
 */
const insertSingleWithDefaultQuery = db
  .insert(posts)
  .values({
    id: 1,
    txt: "lorem ipsum",
    user: "alice",
    // no `isDraft` - will use default value
  })
  .toSQL();
console.log(
  `[Insert single with default]\n${stringOfQuery(insertSingleWithDefaultQuery)}\n`
);
await executeQuery(insertSingleWithDefaultQuery);

/**
 * Inserts multiple example posts in one query.
 */
const insertMultiQuery = db
  .insert(posts)
  .values(
    loremIpsum.map((line, idx) => ({
      id: 0,
      user: `user${idx}`,
      txt: line,
      isDraft: false,
    }))
  )
  .toSQL();
console.log(`[Insert multi]\n${stringOfQuery(insertMultiQuery)}\n`);
await executeQuery(insertMultiQuery);

/**
 * Selects all posts.
 */
const selectAllQuery = db.select().from(posts).toSQL();
console.log(`[Select all]\n${stringOfQuery(selectAllQuery)}\n`);
await executeQuery(selectAllQuery);

/**
 * Selects count of rows.
 */
const selectCountQuery = db
  .select({ rowCount: count().as("rowCount") })
  .from(posts)
  .toSQL();
console.log(`[Select count]\n${stringOfQuery(selectCountQuery)}\n`);
await executeQuery(selectCountQuery);

/**
 * Selects posts by a certain `name`.
 */
const selectWhereQuery = db
  .select()
  .from(posts)
  .where(eq(posts.user, "alice")) // this generates incompatible SQL
  // .where(eq(sql.raw(`\`${posts.user.name}\``), "alice")) // this works
  .toSQL();
console.log(`[Select where]\n${stringOfQuery(selectWhereQuery)}\n`);
await executeQuery(selectWhereQuery);

/**
 * Deletes post with ID 1.
 */
const deleteSimpleQuery = db
  .delete(posts)
  .where(eq(posts.id, 1)) // this generates incompatible SQL
  // .where(eq(sql.raw(`\`${posts.id.name}\``), 1)) // this works
  .toSQL();
console.log(`[Delete simple]\n${stringOfQuery(deleteSimpleQuery)}\n`);
await executeQuery(deleteSimpleQuery);

/**
 * Deletes post with ID 4 and name `hello`.
 */
const deleteMultiConditionQuery = db
  .delete(posts)
  .where(and(eq(posts.id, 4), sql`match('lorem')`)) // this generates incompatible SQL
  // this works
  // .where(sql`${eq(sql.raw(`\`${posts.id.name}\``), 4)} and ${sql`match('lorem')`}`)
  .toSQL();
console.log(
  `[Delete multi-condition]\n${stringOfQuery(deleteMultiConditionQuery)}\n`
);
await executeQuery(deleteMultiConditionQuery);
