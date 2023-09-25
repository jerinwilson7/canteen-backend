var express = require("express");
var router = express.Router();

const { userRegister } = require("../Services/authServices");

/* GET home page. */
router.post("/create-user", function (req, res, next) {
  let user = req.body;
  userRegister(user);
  console.log(user);
});

module.exports = router;
