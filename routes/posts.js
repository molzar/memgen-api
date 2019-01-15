const express = require('express');
const router = express.Router();
const posts = require('../api/posts');
const postsEntity = require('../model/posts');

router.post('/', (req, res, next) => {
    const post = postsEntity.build({
        url: req.query.url, 
        id_user: req.query.id_user});
    posts.insert(post)
        .then(resolve => {
            return res.json(resolve);
        })
        .catch(reject => {
            return res.status(500).json(reject);
        });
});

router.put('/:id', (req, res, next) => {
    const post = postsEntity.build({
        id: req.params.id,
        url: req.query.url, 
        id_user: req.query.id_user});

    posts.update(post)
        .then(resolve => {
            return res.json(resolve);
        })
        .catch(reject => {
            return res.status(500).json(reject);
        });
});

router.get('/', (req, res, next) => {
    posts.findAllPosts()
        .then(resolve => {
            return res.json(resolve.data);
        })
        .catch(reject => {
            return res.status(500).json(reject.data);
        });
});

router.get('/:idUser', (req, res, next) => {
    posts.findByUser(req.params.idUser)
        .then(resolve => {
            return res.json(resolve.data);
        })
        .catch(reject => {
            return res.status(500).json(reject.data);
        });
});

router.get('/:idUser/:id', (req, res, next) => {
    posts.findById(req.params.id)
        .then(resolve => {
            return res.json(resolve.data);
        })
        .catch(reject => {
            return res.status(500).json(reject.data);
        });
});

router.delete('/:id', (req, res, next) => {
    posts.deleteById(req.params.id)
        .then(resolve => {
            return res.json(resolve);
        })
        .catch(reject => {
            return res.status(500).json(reject);
        });
});


module.exports = router;