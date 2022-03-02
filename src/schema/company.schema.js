const Joi = require("joi");
const joiMiddleware = require("../middlewares/joiMiddleware");

const createCompanySchema = Joi.object().keys({
  body: {
    id: Joi.string().guid({
      version: ["uuidv4", "uuidv5"],
    }),
    companyName: Joi.string().required(),
    companyURL: Joi.string().hostname().required(),
    companyAddress: Joi.string(),
    recruiterName: Joi.string(),
    recruiterEmail: Joi.string().email(),
    recruiterNumber: Joi.string(),
    rate: Joi.number().min(0).max(100),
  },
});

const getCompanySchema = Joi.object().keys({
  params: {
    companyId: Joi.string().guid({
      version: ["uuidv4", "uuidv5"],
    }),
  },
});

const deleteCompanySchema = Joi.object().keys({
  params: {
    companyId: Joi.string().guid({
      version: ["uuidv4", "uuidv5"],
    }),
  },
});

const getCompaniesSchema = Joi.object().keys({
  params: {
    offset: Joi.number(),
  },
});

const updateCompanySchema = Joi.object().keys({
  params: {
    id: Joi.string().guid({
      version: ["uuidv4", "uuidv5"],
    }),
  },
  body: {
    companyName: Joi.string(),
    companyURL: Joi.string().hostname(),
    companyAddress: Joi.string(),
    recruiterName: Joi.string(),
    recruiterEmail: Joi.string().email(),
    recruiterNumber: Joi.string(),
  },
});

module.exports = {
  createCompanySchema: joiMiddleware(createCompanySchema),
  getCompanySchema: joiMiddleware(getCompanySchema),
  getCompaniesSchema: joiMiddleware(getCompaniesSchema),
  deleteCompanySchema: joiMiddleware(deleteCompanySchema),
  updateCompanySchema: joiMiddleware(updateCompanySchema),
};
