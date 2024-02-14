# Drizzle Manticore Example

This project demonstrates usage of Drizzle to generate MySQL-syntax queries for
Manticore Search.

Currently, because Manticore supports a limited subset of MySQL syntax, it does
not always parse the queries that Drizzle generates by default, as the examples
in this project demonstrate. The main syntax alignment issues I've noticed have
been outlined in [this issue](https://github.com/manticoresoftware/manticoresearch/issues/1824).

# Overview

Drizzle is a Typescript ORM library and migration tool. It's fully type-safe,
based on the database schema defined in `schema.ts`. (More commentary at the top
of that file.)

We initialize a Drizzle ORM object in `dbClient.ts` given the schema above and a
connection. Here, we do something a bit hacky using the Planetscale adapter.
Drizzle provides numerous adapters for different databases and connection
mechanisms. For MySQL, there are the mysql2 and Planetscale adapters.

Because I'm just using Drizzle to generate SQL strings (execution is handled by
POSTing to Manticore's HTTP API), any Drizzle MySQL adapter should work;
however, the mysql2 adapter tries to set up a connection on initialization.
The Planetscale adapter does not do this, so I used the Planetscale adapter.
It's possible that Manticore's MySQL API is compatible with Drizzle's mysql2
adapter, but I haven't tested this.

Examples of ORM usage live in `index.ts`. The ORM-generated queries are printed
to console. Queries can be executed by uncommenting the `executeQuery` lines.

# Environment variables

```
# the HTTP API
MANTICORE_URL=http://...:9308
```
