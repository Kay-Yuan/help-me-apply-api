/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("company", function (table) {
    table.uuid("id").primary();
    table.string("companyName").unique().notNullable();
    table.string("companyURL").notNullable();
    table.string("companyAddress").nullable();
    table.string("recruiterName").nullable();
    table.string("recruiterEmail").nullable();
    table.string("recruiterNumber").nullable();
    table.integer("rate").nullable();
  });
  return knex.raw("GRANT ALL PRIVILEGES ON company TO postgres;");
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("company");
};
