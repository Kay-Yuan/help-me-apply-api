const Joi = require("joi");
const joiMiddleware = require("../middlewares/joiMiddleware");

const createCompanySchema = Joi.object().keys({
  body: {
    id: Joi.string().guid({
      version: ["uuidv4", "uuidv5"],
    }),
    companyName: Joi.string().trim().required(),
    companyURL: Joi.string()
      .uri({ scheme: ["https", "http"] })
      .required(),
    companyAddress: Joi.string().trim().allow(""),
    recruiterName: Joi.string().trim().allow(""),
    recruiterEmail: Joi.string().email(),
    recruiterNumber: Joi.string().trim().allow(""),
    rate: Joi.number().optional().min(0).max(5).allow(null),
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
    companyName: Joi.string().trim(),
    companyURL: Joi.string()
      .uri({ scheme: ["https", "http"] })
      .required(),
    companyAddress: Joi.string().trim().allow(""),
    recruiterName: Joi.string().trim().allow(""),
    recruiterEmail: Joi.string().email(),
    recruiterNumber: Joi.string().trim().allow(""),
  },
});

const searchCompanySchema = Joi.object().keys({
  prarms: { name: Joi.string().required().max(200) },
});

module.exports = {
  createCompanySchema: joiMiddleware(createCompanySchema),
  getCompanySchema: joiMiddleware(getCompanySchema),
  getCompaniesSchema: joiMiddleware(getCompaniesSchema),
  deleteCompanySchema: joiMiddleware(deleteCompanySchema),
  updateCompanySchema: joiMiddleware(updateCompanySchema),
  searchCompanySchema: joiMiddleware(searchCompanySchema),
};
