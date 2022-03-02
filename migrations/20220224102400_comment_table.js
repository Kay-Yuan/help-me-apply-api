/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("comment", function (table) {
    table.uuid("id").primary();
    table.timestamp("dateCreated").notNullable();
    table.string("content").nullable();
    table
      .uuid("applicationId")
      .notNullable()
      .references("id")
      .inTable("application")
      .onDelete("CASCADE");
  });
  return knex.raw("GRANT ALL PRIVILEGES ON company TO postgres;");
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("comment");
};
