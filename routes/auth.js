var express = require("express");
var router = express.Router();
const User = require("../models/User");
const {
  userRegister,
  userActivation,
  userLogin,
} = require("../Services/authServices");
const CatchAsyncErrors = require("../middleware/CatchAsyncErrors");
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwtToken");

/* GET home page. */
router.post("/create-user", async function (req, res, next) {
  try {
    const response = await userRegister(req.body);
    return res.send(response);
  } catch (error) {
    console.log(error);
  }
});

//activation route

// router.get(
//   "/activation",
//   CatchAsyncErrors(async (req, res, next) => {
//     res.render("../views/index.jade");
//     try {
//       userActivation();
//     } catch (error) {
//       console.log(error);
//     }
//   })
// );

router.get("/activation/:token", async function (req, res, next) {
  const { token } = req.params;

  try {
    const response = await userActivation(token, res);
    return res.send(response);
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const resp = await userLogin(req.body);
  return res.send(resp);
});

module.exports = router;
