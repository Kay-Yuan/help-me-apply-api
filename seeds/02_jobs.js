const { v4: uuidv4 } = require("uuid");

const { companyData } = require("./01_companies");

console.log(companyData);

/**
 *  0 - coles
 *  1 - woolworths
 *  2 - Aldi - Bulter
 *  3 - apple
 *  4 - nike
 */
const companyIds = companyData.map((company) => company.id);

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("job").del();
  await knex("job").insert([
    {
      id: uuidv4(),
      companyId: companyIds[0],
      jobTitle: "Software Engineer",
      jobLocation: "Melbourne",
      jobDescription: "We are hiring for our xxx",
      jobRequirement: "JavaScript, NodeJS, Postgres",
      jobExperienceLevel: "Junior",
      jobType: "full-time",
      jobSalaryRange: "56000 - 80000",
    },
    {
      id: uuidv4(),
      companyId: companyIds[1],
      jobTitle: "Software Engineer",
      jobLocation: "Sydney",
      jobDescription: "some random stuff here",
      jobRequirement: "JavaScript, NodeJS, Postgres",
      jobExperienceLevel: "Junior",
      jobType: "full-time",
      jobSalaryRange: "56000 - 80000",
    },
    {
      id: uuidv4(),
      companyId: companyIds[2],
      jobTitle: "General Sales",
      jobLocation: "2 Butler Bvd, Adelaide Airport SA 5950",
      jobDescription: "Help us sell stuff",
      jobRequirement: "Good communication skills",
      jobExperienceLevel: "Junior",
      jobType: "full-time",
      jobSalaryRange: "40000 - 50000",
    },
    {
      id: uuidv4(),
      companyId: companyIds[3],
      jobTitle: "Apple Service Technician",
      jobLocation: "BrisbaneCBD - Inner Suburbs",
      jobDescription: "We are seeking an experienced, self-motivated Apple technician.",
      jobRequirement:
        "Apple Certification, Hp, Lenovo or Samsung Certification is desired, Excellent forward planning and personal workflow management skills",
      jobExperienceLevel: "Mid",
      jobType: "full-time",
      jobSalaryRange: "70000 - 90000",
    },
    {
      id: uuidv4(),
      companyId: companyIds[4],
      jobTitle: "Inbound Transport Analyst",
      jobLocation: "MelbourneCBD - Inner Suburbs",
      jobDescription:
        "Your role will be to ensure the successful and on time delivery of product to our wholesale customers. We are looking for someone who thrives in problem solving and strategic thinking, to develop ideas when difficult issues arise.",
      jobRequirement:
        "Strong analytical skills including cost modelling, performance management and financial review. Advanced Microsoft Office knowledge (Excel, PowerPoint, Visio and Project essential)",
      jobExperienceLevel: "Senior",
      jobType: "part-time",
      jobSalaryRange: "",
    },
  ]);
};
