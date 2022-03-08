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
    jobLink: Joi.string()
      .uri({ scheme: ["https", "http"] })
      .required(),
    jobTitle: Joi.string().required(),
    jobLocation: Joi.string(),
    jobDescription: Joi.string(),
    jobRequirement: Joi.string(),
    jobExperienceLevel: Joi.string(),
    jobType: Joi.string(),
    jobSalaryRange: Joi.string(),
    jobStatus: Joi.string().valid("true", "false").required(),
  },
});

const getJobSchema = Joi.object().keys({
  params: {
    jobId: Joi.string().guid({
      version: ["uuidv4", "uuidv5"],
    }),
  },
});

const deleteJobSchema = Joi.object().keys({
  params: {
    jobId: Joi.string().guid({
      version: ["uuidv4", "uuidv5"],
    }),
  },
});

const updateJobSchema = Joi.object().keys({
  params: {
    jobId: Joi.string().guid({
      version: ["uuidv4", "uuidv5"],
    }),
  },
  body: {
    companyId: Joi.string().guid({
      version: ["uuidv4", "uuidv5"],
    }),
    jobTitle: Joi.string(),
    jobLocation: Joi.string(),
    jobDescription: Joi.string(),
    jobRequirement: Joi.string(),
    jobExperienceLevel: Joi.string(),
    jobType: Joi.string(),
    jobSalaryRange: Joi.string(),
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
  deleteJobSchema: joiMiddleware(deleteJobSchema),
  updateJobSchema: joiMiddleware(updateJobSchema),
};
