const express = require("express");
const request = require("request").defaults({ rejectUnauthorized: false });
const router = express.Router();

router.get("/:imgLink", (req, response, next) => {
  response.header("Accept", "image");
  // response.header("Access-Control-Allow-Origin", "*");
  // response.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, Content-Type, Accept, X-Auth-Token, X-Requested-With, Authorization"
  // );
  // response.header(
  //   "Access-Control-Allow-Methods",
  //   "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  // );
  // response.header("access-control-allow-origin", "true");

  request(req.params.imgLink).pipe(response);
});

module.exports = router;
