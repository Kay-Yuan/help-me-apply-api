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
  },
});

const getCompanySchema = Joi.object().keys({
  params: {
    companyId: Joi.string().guid({
      version: ["uuidv4", "uuidv5"],
    }),
  },
});

module.exports = {
  createCompanySchema: joiMiddleware(createCompanySchema),
  getCompanySchema: joiMiddleware(getCompanySchema),
};
