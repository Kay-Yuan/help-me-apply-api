const Joi = require("joi");
const joiMiddleware = require("../middlewares/joiMiddleware");

const createApplicationSchema = Joi.object().keys({
  body: {
    applicationStatus: Joi.string(),
    expectedSalary: Joi.number(),
    jobId: Joi.string().guid({
      version: ["uuidv4", "uuidv5"],
    }),
  },
});

const getApplicationSchema = Joi.object().keys({
  params: {
    applicationId: Joi.string().guid({
      version: ["uuidv4", "uuidv5"],
    }),
  },
});

const deleteApplicationSchema = Joi.object().keys({
  params: {
    applicationId: Joi.string().guid({
      version: ["uuidv4", "uuidv5"],
    }),
  },
});

const updateApplicationSchema = Joi.object().keys({
  params: {
    applicationId: Joi.string().guid({
      version: ["uuidv4", "uuidv5"],
    }),
  },
  body: {
    applicationStatus: Joi.string(),
    expectedSalary: Joi.number(),
    jobId: Joi.string().guid({
      version: ["uuidv4", "uuidv5"],
    }),
  },
});

const getApplicationsSchema = Joi.object().keys({
  params: {
    offset: Joi.number(),
  },
});

module.exports = {
  createApplicationSchema: joiMiddleware(createApplicationSchema),
  getApplicationSchema: joiMiddleware(getApplicationSchema),
  getApplicationsSchema: joiMiddleware(getApplicationsSchema),
  deleteApplicationSchema: joiMiddleware(deleteApplicationSchema),
  updateApplicationSchema: joiMiddleware(updateApplicationSchema),
};
