const Joi = require("joi");
const joiMiddleware = require("../middlewares/joiMiddleware");

const createCommentSchema = Joi.object().keys({
  body: {
    content: Joi.string(),
    applicationId: Joi.string().guid({
      version: ["uuidv4", "uuidv5"],
    }),
  },
});

const getCommentSchema = Joi.object().keys({
  params: {
    commentId: Joi.string().guid({
      version: ["uuidv4", "uuidv5"],
    }),
  },
});

const deleteCommentSchema = Joi.object().keys({
  params: {
    commentId: Joi.string().guid({
      version: ["uuidv4", "uuidv5"],
    }),
  },
});

const updateCommentSchema = Joi.object().keys({
  params: {
    commentId: Joi.string().guid({
      version: ["uuidv4", "uuidv5"],
    }),
  },
  body: {
    dateCreated: Joi.date().timestamp(),
    content: Joi.string(),
    applicationId: Joi.string().guid({
      version: ["uuidv4", "uuidv5"],
    }),
  },
});

const getCommentsSchema = Joi.object().keys({
  params: {
    offset: Joi.number(),
  },
});

const getCommentByApplicationIdSchema = Joi.object().keys({
  params: {
    applicationId: Joi.string().guid({
      version: ["uuidv4", "uuidv5"],
    }),
  },
});

module.exports = {
  createCommentSchema: joiMiddleware(createCommentSchema),
  getCommentSchema: joiMiddleware(getCommentSchema),
  getCommentsSchema: joiMiddleware(getCommentsSchema),
  getCommentByApplicationIdSchema: joiMiddleware(
    getCommentByApplicationIdSchema
  ),
  deleteCommentSchema: joiMiddleware(deleteCommentSchema),
  updateCommentSchema: joiMiddleware(updateCommentSchema),
};
