var express = require("express");
const { adminLogin } = require("../Services/adminAuthServices");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/login", async (req, res) => {
  const response = await adminLogin(req.UserName);
  res.json(response);
});

module.exports = router;
