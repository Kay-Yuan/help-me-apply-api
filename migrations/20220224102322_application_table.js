/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("application", function (table) {
    table.uuid("id").primary();
    table.timestamp("dateCreated").notNullable();
    table.string("applicationStatus").nullable();
    table.integer("expectedSalary").unsigned().nullable();
    table
      .uuid("jobId")
      .notNullable()
      .references("id")
      .inTable("job")
      .onDelete("CASCADE");
  });
  return knex.raw("GRANT ALL PRIVILEGES ON company TO postgres;");
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("application");
};
