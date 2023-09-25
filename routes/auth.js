var express = require("express");
var router = express.Router();

/* GET home page. */
router.post("/create-user", function (req, res, next) {
  let body = req.body;
  console.log(body);
  res.json(req.body);
});

module.exports = router;
