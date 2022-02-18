const Joi = require("joi");
const joiMiddleware = require("../middlewares/joiMiddleware");

const createJobSchema = Joi.object().keys({
  body: {
    id: Joi.string().guid({
      version: ["uuidv4", "uuidv5"],
    }),
    companyId: Joi.string()
      .guid({
        version: ["uuidv4", "uuidv5"],
      })
      .required(),
    jobTitle: Joi.string().required(),
    jobLocation: Joi.string(),
    jobDescription: Joi.string(),
    jobRequirement: Joi.string(),
    jobExperienceLevel: Joi.string(),
    jobType: Joi.string(),
    jobSalaryRange: Joi.string(),
  },
});

const getJobSchema = Joi.object().keys({
  params: {
    jobId: Joi.string().guid({
      version: ["uuidv4", "uuidv5"],
    }),
  },
});

const getJobsSchema = Joi.object().keys({
  params: {
    offset: Joi.number(),
  },
});

module.exports = {
  createJobSchema: joiMiddleware(createJobSchema),
  getJobSchema: joiMiddleware(getJobSchema),
  getJobsSchema: joiMiddleware(getJobsSchema),
};
