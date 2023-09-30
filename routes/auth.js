var express = require("express");
var router = express.Router();
const User = require("../models/User");
const { userRegister } = require("../Services/authServices");
const ErrorHandler = require("../utils/ErrorHandler");

/* GET home page. */
router.post("/create-user", async function (req, res, next) {
  try {
    const response = await userRegister(req.body);
    return res.send(response);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
