import { type Config } from "drizzle-kit";

const manticoreSqlUrl = process.env.MANTICORE_SQL_URL;
if (manticoreSqlUrl === undefined) throw new Error("MANTICORE_SQL_URL is undefined");

export default {
  schema: "./src/schema.ts",
  driver: "mysql2",
  dbCredentials: {
    uri: manticoreSqlUrl,
  },
} satisfies Config;
