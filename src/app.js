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

app.use(bodyParser.json());
app.use(cors());

app.post("/company/create", (req, res) => {
  // validate body
  const schema = Joi.object({
    id: Joi.string().guid({
      version: ["uuidv4", "uuidv5"],
    }),
    companyName: Joi.string().required(),
    companyURL: Joi.string().hostname().required(),
    companyAddress: Joi.string(),
    recruiterName: Joi.string(),
    recruiterEmail: Joi.string().email(),
    recruiterNumber: Joi.string(),
  });

  const value = schema.validate(req.body);
  const {
    companyName,
    companyURL,
    companyAddress,
    recruiterName,
    recruiterEmail,
    recruiterNumber,
  } = req.body;
  console.log(value);

  if (value.error) {
    res.send(value.error);
    return;
  }

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
    .then(() => {});

  res.send("ok");
});

app.get("/company/:companyId", (req, res) => {
  const schema = Joi.object({
    companyId: Joi.string().guid({
      version: ["uuidv4", "uuidv5"],
    }),
  });

  const companyId = req.params.companyId;

  const value = schema.validate({ companyId });

  if (value.error) {
    // menaing of different error codes:
    res.status(400);
    res.send(value.error);
    return;
  }

  knex("company")
    .where({ id: companyId })
    .then((queryResult) => {
      const company = queryResult[0];

      res.send(company);
    });
});

app.get("/company", (req, res) => {
  // get query out from req
  if (!req.query.offset) {
    res.status(400);
    res.send("/company request need a query for offset!");
    return;
  }
  const offset = req.query.offset;
  const limit = 5;

  // validate query
  const schema = Joi.object({
    offset: Joi.number(),
  });
  const value = schema.validate({ offset });
  if (value.error) {
    res.status(400);
    res.send(value.error);
    return;
  }

  // get result from db
  knex("company")
    .limit(limit)
    .offset(offset)
    .then((companyList) => {
      res.send(companyList);
    });
});

app.post("/job/create", (req, res) => {
  // validate body
  const schema = Joi.object({
    id: Joi.string().guid({
      version: ["uuidv4", "uuidv5"],
    }),
    companyId: Joi.number().required(),
    jobTitle: Joi.string().required(),
    jobLocation: Joi.string(),
    jobDescription: Joi.string(),
    jobRequirement: Joi.string(),
    jobExperienceLevel: Joi.string(),
    jobType: Joi.string(),
    jobSalaryRange: Joi.string(),
  });

  const value = schema.validate(req.body);
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
  console.log(value);

  if (value.error) {
    res.send(value.error);
    return;
  }

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

app.get("/", function (req, res) {
  res.send("Hello World - express!");
});

app.listen(3000, () => console.log("Server started"));
