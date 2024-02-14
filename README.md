# Drizzle Manticore Example

This project demonstrates usage of Drizzle to generate MySQL-syntax queries for
Manticore Search.

Because Manticore supports a limited subset of MySQL syntax, it doesn't always
parse the queries that Drizzle generates, as the examples in this project
demonstrate. The main syntax alignment issues I've noticed have
been outlined in [this issue](https://github.com/manticoresoftware/manticoresearch/issues/1824).

# Overview

Drizzle is a Typescript ORM library and migration tool. It's fully type-safe,
based on the database schema defined in `schema.ts`. (More commentary at the top
of that file.)

A Drizzle ORM object is initialized in `dbClient.ts`, given the schema above and
a connection. Drizzle provides numerous adapters for different databases and
connection mechanisms. Drizzle has [MySQL adapters](https://orm.drizzle.team/docs/get-started-mysql) for the mysql2 and Planetscale
libraries.

As seen in `dbClient.ts`, this project uses the Planetscale adapter because the
mysql2 adapter tries to connect to the database on initialization, but this
project uses Drizzle _only_ to generate SQL strings, and the connection URL
passed to Drizzle is fake (execution is instead handled by POSTing to
Manticore's HTTP API).

Note: It's possible that Manticore's MySQL API is compatible with Drizzle's
mysql2 adapter, but I haven't tested this.

Examples of ORM usage live in `index.ts`. The ORM-generated queries are printed
to console. Queries can be executed by uncommenting the `executeQuery` lines.

# Environment variables

```
# the HTTP API
MANTICORE_URL=http://...:9308
```
