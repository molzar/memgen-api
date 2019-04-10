const express = require("express");
const router = express.Router();
const comments = require("../api/comments.js");
const Models = require("../models/index");
const commentsEntity = Models.comments;

router.post("/", (req, res, next) => {
  const comment = commentsEntity.build({
    id_post: req.query.id_post,
    id_user: req.query.id_user,
    text_comment: req.query.text_comment,
    id_parent: req.query.id_parent
  });
  comments
    .insert(
      comment,
      req.query.limit ? req.query.limit : 100,
      req.query.offset ? req.query.offset : 0
    )
    .then(resolve => {
      return res.json(resolve);
    })
    .catch(reject => {
      return res.status(500).json(reject);
    });
});

router.put("/:id", (req, res, next) => {
  const comment = commentsEntity.build({
    id: req.params.id,
    id_post: req.query.id_post,
    id_user: req.query.id_user,
    text_comment: req.query.text_comment,
    id_parent:
      req.query.id_parent || req.query.id_parent !== -1
        ? req.query.id_parent
        : null
  });
  console.log(
    `${req.params.id} ${req.query.id_post} ${req.query.id_user} ${
      req.query.text_comment
    } ${req.query.id_parent}`
  );
  comments
    .update(
      comment,
      req.query.limit ? req.query.limit : 100,
      req.query.offset ? req.query.offset : 0
    )
    .then(resolve => {
      console.table(resolve);
      return res.json(resolve);
    })
    .catch(reject => {
      return res.status(500).json(reject);
    });
});

router.get("/get/count/:idPost/:idParent?", (req, res, next) => {
  const localIdParent = req.params.idParent ? req.params.idParent : null;
  comments
    .countPostComments(req.params.idPost, localIdParent)
    .then(resolve => {
      return res.json(resolve);
    })
    .catch(reject => {
      return res.status(500).json(reject);
    });
});

router.get("/:idPost/:limit&:offset/:idParent?", (req, res, next) => {
  comments
    .findByPost(
      req.params.idPost,
      req.params.limit ? req.params.limit : 100,
      req.params.offset ? req.params.offset : 0,
      req.params.idParent ? req.params.idParent : "-1"
    )
    .then(resolve => {
      return res.json(resolve);
    })
    .catch(reject => {
      return res.status(500).json(reject);
    });
});

router.delete("/:id", (req, res, next) => {
  comments
    .deleteById(req.params.id)
    .then(resolve => {
      debugger;
      return res.json(resolve);
    })
    .catch(reject => {
      return res.status(500).json(reject);
    });
});

module.exports = router;
