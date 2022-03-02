const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const companyRouter = require("./routes/company/company.route");
const jobRouter = require("./routes/job/job.route");
const applicationRouter = require("./routes/application/application.route");
const commentRouter = require("./routes/comment/comment.route");

app.use(bodyParser.json());
app.use(cors());

app.use("/company", companyRouter);

app.use("/job", jobRouter);

app.use("/application", applicationRouter);

app.use("/comment", commentRouter);

app.listen(5000, () => console.log("Server started"));
