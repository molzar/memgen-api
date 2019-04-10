const express = require("express");
const router = express.Router();
const likes = require("../api/likes");
const Models = require("../models/index");
const likesEntity = Models.likes;

router.post("/", (req, res, next) => {
  const like = likesEntity.build({
    id_post: req.query.id_post,
    id_user: req.query.id_user,
    like: req.query.like
  });
  likes
    .upsert(like)
    .then(resolve => {
      return res.json(resolve);
    })
    .catch(reject => {
      return res.status(500).json(reject);
    });
});

router.put("/:id", (req, res, next) => {
  const like = likesEntity.build({
    id: req.params.id,
    id_post: req.query.id_post,
    id_user: req.query.id_user,
    like: req.query.like
  });

  likes
    .update(like)
    .then(resolve => {
      return res.json(resolve);
    })
    .catch(reject => {
      return res.status(500).json(reject);
    });
});

router.get("/:idPost", (req, res, next) => {
  likes
    .findByPost(req.params.idPost)
    .then(resolve => {
      return res.json(resolve);
    })
    .catch(reject => {
      return res.status(500).json(reject);
    });
});

router.delete("/:id", (req, res, next) => {
  likes
    .deleteById(req.params.id)
    .then(resolve => {
      return res.json(resolve);
    })
    .catch(reject => {
      return res.status(500).json(reject);
    });
});

module.exports = router;
