const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const companyRoute = require("./routes/company/company.route");
const jobRouter = require("./routes/job/job.route");

app.use(bodyParser.json());
app.use(cors());

app.use("/company", companyRoute);

app.use("/job", jobRouter);

app.listen(3000, () => console.log("Server started"));
