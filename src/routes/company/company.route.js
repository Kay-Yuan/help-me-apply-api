const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const knex = require("../../config/db");

const { createCompanySchema, getCompanySchema, getCompaniesSchema } = require("../../schema/company.schema");

router.post("/create", createCompanySchema, (req, res) => {
  const { companyName, companyURL, companyAddress, recruiterName, recruiterEmail, recruiterNumber } = req.body;

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

router.get("/:companyId", getCompanySchema, (req, res) => {
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

router.get("/", getCompaniesSchema, (req, res) => {
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

module.exports = router;
