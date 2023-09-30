var express = require("express");
var router = express.Router();
const User = require("../models/User");

/* GET users listing. */
router.post("/create-user", function (req, res, next) {
  const { name, email, password } = req.body;
  console.log(req.body);
  const userEmail = User.findOne({ email });
  if (userEmail) {
    return res.status(400).json({ message: "User already exists" });
  }
  res.send("GET request received");
});

module.exports = router;
