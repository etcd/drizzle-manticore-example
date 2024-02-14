import { and, count, eq } from "drizzle-orm";
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
console.log("Insert single\n", stringOfQuery(insertSingleQuery));
// await executeQuery(insertSingleQuery);

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
  "Insert single with default\n",
  stringOfQuery(insertSingleWithDefaultQuery)
);
// await executeQuery(insertSingleWithDefaultQuery);

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
console.log("Insert multi\n", stringOfQuery(insertMultiQuery));
// await executeQuery(insertMultiQuery);

/**
 * Selects all posts.
 */
const selectAllQuery = db.select().from(posts).toSQL();
console.log("Select all\n", stringOfQuery(selectAllQuery));
// await executeQuery(selectAllQuery);

/**
 * Selects count of rows.
 */
const selectCountQuery = db
  .select({ rowCount: count().as("rowCount") })
  .from(posts)
  .toSQL();
console.log("Select count\n", stringOfQuery(selectCountQuery));
// await executeQuery(selectCountQuery);

/**
 * Selects posts by a certain `name`.
 */
const selectWhereQuery = db
  .select()
  .from(posts)
  .where(eq(posts.user, "alice"))
  .toSQL();
console.log("Select where\n", stringOfQuery(selectWhereQuery));
// await executeQuery(selectWhereQuery);

/**
 * Deletes post with ID 1.
 */
const deleteSimpleQuery = db.delete(posts).where(eq(posts.id, 1)).toSQL();
console.log("Delete simple\n", stringOfQuery(deleteSimpleQuery));
// await executeQuery(deleteSimpleQuery);

/**
 * Deletes post with ID 4 and name `hello`.
 */
const deleteMultiConditionQuery = db
  .delete(posts)
  .where(and(eq(posts.id, 4), eq(posts.user, "alice")))
  .toSQL();
console.log(
  "Delete multi-condition\n",
  stringOfQuery(deleteMultiConditionQuery)
);
// await executeQuery(deleteMultiConditionQuery);
