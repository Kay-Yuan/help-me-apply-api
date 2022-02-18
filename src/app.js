const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
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

const {
  createCompanySchema,
  getCompanySchema,
  getCompaniesSchema,
} = require("./schema/company.schema");

const {
  createJobSchema,
  getJobSchema,
  getJobsSchema,
} = require("./schema/job.schema");

app.use(bodyParser.json());
app.use(cors());

app.post("/company/create", createCompanySchema, (req, res) => {
  const {
    companyName,
    companyURL,
    companyAddress,
    recruiterName,
    recruiterEmail,
    recruiterNumber,
  } = req.body;

  // generate uuid and add to db
  const id = uuidv4();

  knex("company")
    .insert({
      id,
      companyName,
      companyURL,
      companyAddress,
      recruiterName,
      recruiterEmail,
      recruiterNumber,
    })
    .then(() => {})
    .catch(() => {
      res.status(500);
      res.send("INTERNAL SERVER ERROR");
    });

  res.send({ message: "company created" });
});

app.get("/company/:companyId", getCompanySchema, (req, res) => {
  const companyId = req.params.companyId;

  knex("company")
    .where({ id: companyId })
    .then((queryResult) => {
      const company = queryResult[0];

      if (company) {
        res.send(company);
      } else {
        res.status(400);
        res.send({ message: "company not found" });
      }
    })
    .catch(() => {
      res.status(500);
      res.send("INTERNAL SERVER ERROR");
    });
});

app.get("/company", getCompaniesSchema, (req, res) => {
  // get query out from req
  if (!req.query.offset) {
    res.status(400);
    res.send("/company request need a query for offset!");
    return;
  }
  const offset = req.query.offset;
  const limit = 5;

  // get result from db
  knex("company")
    .limit(limit)
    .offset(offset)
    .then((companyList) => {
      res.send(companyList);
    })
    .catch(() => {
      res.status(500);
      res.send("INTERNAL SERVER ERROR");
    });
});

app.post("/jobs/create", createJobSchema, (req, res) => {
  const {
    companyId,
    jobTitle,
    jobLocation,
    jobDescription,
    jobRequirement,
    jobExperienceLevel,
    jobType,
    jobSalaryRange,
  } = req.body;

  // generate uuid and add to db
  const id = uuidv4();

  knex("job")
    .insert({
      id,
      companyId,
      jobTitle,
      jobLocation,
      jobDescription,
      jobRequirement,
      jobExperienceLevel,
      jobType,
      jobSalaryRange,
    })
    .then(() => {});

  res.send("ok");
});

app.get("/jobs/:jobId", getJobSchema, (req, res) => {
  const jobId = req.params.jobId;

  knex("job")
    .where({ id: jobId })
    .then((queryResult) => {
      const job = queryResult[0];

      if (job) {
        res.send(job);
      } else {
        res.status(400);
        res.send({ message: "job not found" });
      }
    })
    .catch(() => {
      res.status(500);
      res.send("INTERNAL SERVER ERROR");
    });
});

app.get("/jobs", getJobsSchema, (req, res) => {
  // get query out from req
  if (!req.query.offset) {
    res.status(400);
    res.send("/jobs request need a query for offset!");
    return;
  }
  const offset = req.query.offset;
  const limit = 5;

  // get result from db
  knex("job")
    .limit(limit)
    .offset(offset)
    .then((jobList) => {
      res.send(jobList);
    })
    .catch(() => {
      res.status(500);
      res.send("INTERNAL SERVER ERROR");
    });
});

app.get("/", function (req, res) {
  res.send("Hello World - express!");
});

app.listen(3000, () => console.log("Server started"));
