const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

app.post("/company/create", (req, res) => {
  console.log("-----------");
  console.log(req.body);
  console.log("-----------");

  // validate body

  // generate uuid and add to db

  res.send("ok");
});

app.get("/", function (req, res) {
  res.send("Hello World - express!");
});

app.listen(3000, () => console.log("Server started"));
