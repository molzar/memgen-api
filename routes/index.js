const express = require('express');
const router = express.Router();
const getConfig = require('../configs.js');

router.get('/', function(req, res, next) {
    res.send(getConfig.item("someRandomWelcomeMessage"));
});

module.exports = router;
