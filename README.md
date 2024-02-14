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
to console and executed.

# Environment variables

```
# the HTTP API
MANTICORE_URL=http://...:9308
```

# Run

```
npm run demo
```

# Output

```
[Insert single]
insert into `Post` (`id`, `user`, `txt`, `isDraft`) values (1, 'alice', 'lorem ipsum', false)

[Insert single with default]
insert into `Post` (`id`, `user`, `txt`, `isDraft`) values (1, 'alice', 'lorem ipsum', default)

[Insert multi]
insert into `Post` (`id`, `user`, `txt`, `isDraft`) values (0, 'user0', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', false), (0, 'user1', 'Proin venenatis ante sit amet neque auctor eleifend.', false), (0, 'user2', 'Morbi et massa non risus pulvinar malesuada in non nibh.', false), (0, 'user3', 'Nulla non elit id diam semper malesuada.', false), (0, 'user4', 'Nulla vel nisl ut quam rhoncus lacinia.', false), (0, 'user5', 'Fusce vitae eros sed ex aliquam finibus ultricies ut nibh.', false), (0, 'user6', 'Integer suscipit nulla ut massa dignissim pretium.', false), (0, 'user7', 'Curabitur sit amet lacus vel enim malesuada scelerisque.', false), (0, 'user8', 'Donec interdum risus sit amet viverra suscipit.', false)

[Select all]
select `id`, `user`, `txt`, `isDraft` from `Post`

[Select count]
select count(*) as `rowCount` from `Post`

[Select where]
select `id`, `user`, `txt`, `isDraft` from `Post` where `Post`.`user` = 'alice'

[Delete simple]
delete from `Post` where `Post`.`id` = 1

[Delete multi-condition]
delete from `Post` where (`Post`.`id` = 4 and `Post`.`user` = 'alice')
```
