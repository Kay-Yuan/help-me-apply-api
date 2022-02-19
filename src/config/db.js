const knex = require("knex")({
  client: "postgres",
  connection: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "help_me_apply",
  },
});

module.exports = knex;
