const Joi = require("joi");
const joiMiddleware = require("../middlewares/joiMiddleware");

const createCommentSchema = Joi.object().keys({
  body: {
    id: Joi.string().guid({
      version: ["uuidv4", "uuidv5"],
    }),
    dateCreated: Joi.date().timestamp().required(),
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

module.exports = {
  createCommentSchema: joiMiddleware(createCommentSchema),
  getCommentSchema: joiMiddleware(getCommentSchema),
  getCommentsSchema: joiMiddleware(getCommentsSchema),
  deleteCommentSchema: joiMiddleware(deleteCommentSchema),
  updateCommentSchema: joiMiddleware(updateCommentSchema),
};
