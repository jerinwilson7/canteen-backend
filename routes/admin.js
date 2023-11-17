var express = require("express");
const { adminLogin, adminRegister } = require("../Services/adminAuthServices");
var router = express.Router();

/* GET home page. */
router.post("/create-admin", async function (req, res, next) {
  try {
    const response = await adminRegister(req.body);
    return res.send(response);
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  const response = await adminLogin(req.body);
  res.json(response);
});

module.exports = router;
