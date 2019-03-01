const express = require("express");
const router = express.Router();
const posts = require("../api/posts");
const Models = require("../models/index");
const postsEntity = Models.posts;

router.post("/", (req, res, next) => {
  const post = postsEntity.build({
    url: req.query.url,
    id_user: req.query.id_user
  });
  posts
    .insert(post)
    .then(resolve => {
      return res.json(resolve);
    })
    .catch(reject => {
      return res.status(500).json(reject);
    });
});

router.put("/:id", (req, res, next) => {
  const post = postsEntity.build({
    id: req.params.id,
    url: req.query.url,
    id_user: req.query.id_user
  });

  posts
    .update(post)
    .then(resolve => {
      return res.json(resolve);
    })
    .catch(reject => {
      return res.status(500).json(reject);
    });
});

router.get("/:limit&:offset", (req, res, next) => {
  posts
    .findAllPosts(
      req.params.offset ? req.params.offset : 0,
      req.params.limit ? req.params.limit : 100
    )
    .then(resolve => {
      return res.json(resolve);
    })
    .catch(reject => {
      return res.status(500).json(reject);
    });
});

router.get("/:idUser/:limit&:offset", (req, res, next) => {
  posts
    .findByUser(
      req.params.idUser,
      req.params.limit ? req.params.offset : 0,
      req.params.offset ? req.params.limit : 100
    )
    .then(resolve => {
      return res.json(resolve);
    })
    .catch(reject => {
      return res.status(500).json(reject);
    });
});

router.delete("/:id", (req, res, next) => {
  posts
    .deleteById(req.params.id)
    .then(resolve => {
      return res.json(resolve);
    })
    .catch(reject => {
      return res.status(500).json(reject);
    });
});

module.exports = router;
