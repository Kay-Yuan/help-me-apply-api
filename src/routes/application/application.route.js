const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const knex = require("../../config/db");
const { default: logger } = require("../../logger");

const {
  createApplicationSchema,
  getApplicationSchema,
  getApplicationsSchema,
  deleteApplicationSchema,
  updateApplicationSchema,
} = require("../../schema/application.schema");

router.post("/create", createApplicationSchema, (req, res) => {
  const { applicationStatus, expectedSalary, jobId } = req.body;

  // generate uuid and add to db
  const id = uuidv4();
  const dateCreated = new Date();

  knex("application")
    .insert({
      id,
      dateCreated,
      applicationStatus,
      expectedSalary,
      jobId,
    })
    .then(() => {});

  res.send({ message: "Application created" });
});

router.get("/lists", (req, res) => {
  knex("job as job")
    .join("application as application", "job.id", "application.jobId")
    .join("company as company", "job.companyId", "company.id")
    .select("application.*", "company.companyName", "job.jobTitle")
    .then((result) => {
      logger.info(result);
      res.json(result);
    });
});

router.get("/:applicationId", getApplicationSchema, (req, res) => {
  const applicationId = req.params.applicationId;

  knex("application")
    .where({ id: applicationId })
    .then((queryResult) => {
      const application = queryResult[0];

      if (application) {
        res.send(application);
      } else {
        res.status(400);
        res.send({ message: "application not found" });
      }
    })
    .catch((e) => {
      console.log(e);

      res.status(500);
      res.send("INTERNAL SERVER ERROR");
    });
});

router.get("/", getApplicationsSchema, (req, res) => {
  // get query out from req
  if (!req.query.offset) {
    res.status(400);
    res.send("/applications request need a query for offset!");
    return;
  }
  const offset = req.query.offset;
  const limit = 5;

  // get result from db
  knex("application")
    .limit(limit)
    .offset(offset)
    .then((applicationList) => {
      res.send(applicationList);
    })
    .catch((e) => {
      console.log(e);

      res.status(500);
      res.send("INTERNAL SERVER ERROR");
    });
});

router.delete("/:applicationId", deleteApplicationSchema, (req, res) => {
  const applicationId = req.params.applicationId;

  knex("application")
    .where({ id: applicationId })
    .del()
    .catch((e) => {
      console.log(e);

      res.status(500);
      res.send("INTERNAL SERVER ERROR");
    });

  res.send({ message: "application deleted" });
});

router.put("/:applicationId", updateApplicationSchema, (req, res) => {
  const applicationId = req.params.applicationId;

  const { applicationStatus, expectedSalary, jobId } = req.body;
  const dateCreated = new Date();

  knex("application")
    .where({ id: applicationId })
    .update({
      dateCreated,
      applicationStatus,
      expectedSalary,
      jobId,
    })
    .then(() => {
      res.json({ message: "Application updated" });
    })
    .catch((e) => {
      console.log(e);

      res.status(500);
      res.send("INTERNAL SERVER ERROR");
    });
});

module.exports = router;
