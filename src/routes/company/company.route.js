const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const knex = require("../../config/db");

const {
  createCompanySchema,
  getCompanySchema,
  getCompaniesSchema,
  deleteCompanySchema,
  updateCompanySchema,
} = require("../../schema/company.schema");

router.post("/create", createCompanySchema, (req, res) => {
  const {
    companyName,
    companyURL,
    companyAddress,
    recruiterName,
    recruiterEmail,
    recruiterNumber,
    rate,
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
      rate,
    })
    .then(() => {
      res.send({ message: "company created" });
    })
    .catch(() => {
      res.status(500);
      res.send("INTERNAL SERVER ERROR");
    });
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
  const limit = 10;

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

router.delete("/:companyId", deleteCompanySchema, (req, res) => {
  const companyId = req.params.companyId;

  knex("company")
    .where({ id: companyId })
    .del()
    .then(() => {})
    .catch(() => {
      res.status(500);
      res.send("INTERNAL SERVER ERROR");
    });

  res.send({ message: "company deleted" });
});

router.put("/:companyId", updateCompanySchema, (req, res) => {
  const companyId = req.params.companyId;

  const {
    companyName,
    companyURL,
    companyAddress,
    recruiterName,
    recruiterEmail,
    recruiterNumber,
    rate,
  } = req.body;

  knex("company")
    .where({ id: companyId })
    .update({
      companyName,
      companyURL,
      companyAddress,
      recruiterName,
      recruiterEmail,
      recruiterNumber,
      rate,
    })
    .then(() => {})
    .catch(() => {
      res.status(500);
      res.send("INTERNAL SERVER ERROR");
    });

  res.send({ message: "company updated" });
});

module.exports = router;
