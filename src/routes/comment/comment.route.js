const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const knex = require("../../config/db");
const { default: logger } = require("../../logger");

const {
  createCommentSchema,
  getCommentSchema,
  getCommentsSchema,
  deleteCommentSchema,
  updateCommentSchema,
} = require("../../schema/comment.schema");

router.post("/create", createCommentSchema, (req, res) => {
  const { content, applicationId } = req.body;

  // generate uuid and add to db
  const id = uuidv4();
  const dateCreated = new Date();

  knex("comment")
    .insert({
      id,
      dateCreated,
      content,
      applicationId,
    })
    .then(() => {});

  res.send({ message: "Comment created" });
});

router.get("/byapplicationid", getCommentsSchema, (req, res) => {
  logger.info("hello i am here");
  // get query out from req
  if (!req.query.applicationId) {
    res.status(400);
    res.send("/comments request need a query for application id!");
    return;
  }
  const applicationId = req.query.applicationId;

  // get result from db
  knex("comment")
    .where({ applicationId })
    .then((queryResult) => {
      if (queryResult) {
        logger.info(queryResult);
        res.send(queryResult);
      } else {
        res.status(400);
        res.send({ message: "comment for this application not found" });
      }
    })
    .catch(() => {
      res.status(500);
      res.send("INTERNAL SERVER ERROR");
    });
});

router.get("/:commentId", getCommentSchema, (req, res) => {
  const commentId = req.params.commentId;

  knex("comment")
    .where({ id: commentId })
    .then((queryResult) => {
      const comment = queryResult[0];

      if (comment) {
        res.send(comment);
      } else {
        res.status(400);
        res.send({ message: "comment not found" });
      }
    })
    .catch(() => {
      res.status(500);
      res.send("INTERNAL SERVER ERROR");
    });
});

router.get("/", getCommentsSchema, (req, res) => {
  // get query out from req
  if (!req.query.offset) {
    res.status(400);
    res.send("/comments request need a query for offset!");
    return;
  }
  const offset = req.query.offset;
  const limit = 5;

  // get result from db
  knex("comment")
    .limit(limit)
    .offset(offset)
    .then((commentList) => {
      res.send(commentList);
    })
    .catch(() => {
      res.status(500);
      res.send("INTERNAL SERVER ERROR");
    });
});

router.delete("/:commentId", deleteCommentSchema, (req, res) => {
  const commentId = req.params.commentId;

  knex("comment")
    .where({ id: commentId })
    .del()
    .catch((e) => {
      logger.info(e)
      res.status(500);
      res.send("INTERNAL SERVER ERROR");
    });

  res.send({ message: "comment deleted" });
});

router.put("/:commentId", updateCommentSchema, (req, res) => {
  const commentId = req.params.commentId;

  const { dateCreated, content, applicationId } = req.body;

  knex("comment")
    .where({ id: commentId })
    .update({
      dateCreated,
      content,
      applicationId,
    })
    .catch(() => {
      res.status(500);
      res.send("INTERNAL SERVER ERROR");
    });

  res.send({ message: "comment updated" });
});

module.exports = router;
