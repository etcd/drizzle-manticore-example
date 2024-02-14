import { type Config } from "drizzle-kit";

const manticoreUrl = process.env.MANTICORE_URL;
if (manticoreUrl === undefined) throw new Error("MANTICORE_URL is undefined");

export default {
  schema: "./src/schema.ts",
  driver: "mysql2",
  dbCredentials: {
    uri: manticoreUrl,
  },
} satisfies Config;
