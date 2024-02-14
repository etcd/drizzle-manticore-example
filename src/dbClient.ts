import sqlstring from "sqlstring";

import { Client } from "@planetscale/database";
import { type Query } from "drizzle-orm";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import * as schema from "./schema";

export const db = drizzle(
  new Client({ url: "http://THIS_DOES_NOT_MATTER" }).connection(),
  { schema }
);

export const stringOfQuery = (query: Query) => {
  return sqlstring.format(query.sql, query.params);
};

export const executeQuery = async (query: Query) => {
  const queryString = stringOfQuery(query);

  try {
    return await fetch(`${process.env.MANTICORE_URL}/cli_json`, {
      method: "POST",
      body: encodeURIComponent(queryString),
    });
  } catch (e) {
    console.log(`Failed to execute query\n`);
  }
};
