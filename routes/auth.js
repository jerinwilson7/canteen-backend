var express = require("express");
var router = express.Router();
const User = require("../models/User");
const { userRegister, userActivation } = require("../Services/authServices");
const CatchAsyncErrors = require("../middleware/CatchAsyncErrors");
const jwt = require("jsonwebtoken");

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
    // Verify the activation token
    const decoded = jwt.verify(token, process.env.ACTIVATION_SECRET);
    console.log(decoded.user.email);

    // Find the user associated with the token
    const { name, email, password } = decoded.user;
    const user = await User.findOne({ email: decoded.user.email });

    // Check if the user is already activated
    if (user) {
      return res.status(200).json({ message: "Account is already activated." });
    }

    // Activate the user account (update the database)
    // user = true;
    await User.create({
      name,
      email,
      password,
    });

    // Optionally, you can redirect the user or show a success message
    return res.status(200).json({ message: "Account successfully activated." });
  } catch (error) {
    // Handle token verification errors or other exceptions
    console.error(error);
    return res.status(400).json({ message: "Invalid activation token." });
  }
});

module.exports = router;
