import dotenv from "dotenv";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
import logger from "./logger";

const companyRouter = require("./routes/company/company.route");
const jobRouter = require("./routes/job/job.route");
const applicationRouter = require("./routes/application/application.route");
const commentRouter = require("./routes/comment/comment.route");

dotenv.config();

const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

app.use("/company", companyRouter);

app.use("/job", jobRouter);

app.use("/application", applicationRouter);

app.use("/comment", commentRouter);

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
app.listen(PORT, () => logger.info(`Server started on port ${PORT}`));
