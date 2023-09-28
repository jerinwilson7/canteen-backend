var express = require("express");
var router = express.Router();
const { userRegister } = require("../Services/authServices");

/* GET home page. */
router.post("/create-user", async function (req, res, next) {
  try {
    console.log("route");
    const user = req.body;
    const message = await userRegister(user);
    if (message === "user already exists") {
      // Send a response to the frontend indicating that the user already exists
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    console.log(user);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    // Handle other errors, possibly a 500 Internal Server Error
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
