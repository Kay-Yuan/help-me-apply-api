// import { v4 as uuidv4 } from "uuid";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");

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

  if (value.error) res.send(value.error);

  // try catch?

  // generate uuid and add to db
  const id = uuidv4();
  const knex = require("knex")({
    client: "postgres",
    version: "14.1",
    connection: {
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: "postgres",
      database: "help_me_apply",
    },
  });

  knex("company").insert({
    id,
    companyName,
    companyURL,
    companyAddress,
    recruiterName,
    recruiterEmail,
    recruiterNumber,
  });

  res.send("ok");
});

app.get("/", function (req, res) {
  res.send("Hello World - express!");
});

app.listen(3000, () => console.log("Server started"));
