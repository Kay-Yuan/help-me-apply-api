const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const knex = require("../../config/db");

const { createJobSchema, getJobSchema, getJobsSchema } = require("../../schema/job.schema");

router.post("/create", createJobSchema, (req, res) => {
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

router.get("/:jobId", getJobSchema, (req, res) => {
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

router.get("/", getJobsSchema, (req, res) => {
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

module.exports = router;