/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("job", function (table) {
    table.uuid("id").primary();
    table.uuid("companyId").notNullable();
    table.string("jobTitle").notNullable();
    table.string("jobLocation").nullable();
    table.string("jobDescription").nullable();
    table.string("jobRequirement").nullable();
    table.string("jobExperienceLevel").nullable();
    table.string("jobType").nullable();
    table.string("jobSalaryRange").nullable();
  });
  return knex.raw("GRANT ALL PRIVILEGES ON job TO postgres;");
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("job");
};
