const express = require("express");
const request = require("request").defaults({ rejectUnauthorized: false });
const router = express.Router();
const sharp = require("sharp");

router.get("/:imgLink", (req, response, next) => {
  response.header("Accept", "image");

  const widthLink = parseInt(req.query.width);

  const transformer = sharp().resize({
    width: widthLink || 540,
    fit: sharp.fit.inside
  });

  request(req.params.imgLink)
    .pipe(transformer)
    .pipe(response);
});

module.exports = router;
