var express = require("express");
var router = express.Router();
const User = require("../models/User");
const { getUser } = require("../Services/userServices");

router.get("/get-user", async (req, res) => {
  let email = req.body.email;
  let response = await getUser(email);

  res.json(response);
});

module.exports = router;
