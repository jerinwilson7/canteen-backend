var express = require("express");
var router = express.Router();
const User = require("../models/User");
const { getUser } = require("../Services/userServices");

router.get("/get-user", async (req, res) => {
  console.log("getuser");
  console.log(req.email);
  let email = req.email;
  let response = await getUser(email);

  res.json(response);
});



module.exports = router;
