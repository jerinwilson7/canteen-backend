const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendMail = require("../utils/SendMail");
const ErrorHandler = require("../utils/ErrorHandler");

const userRegister = async (user) => {
  const { name, email, password } = user;
  // const userEmail = await User.findOne({ email });

  // if (userEmail) {
  //   console.log("User Already Exists");
  //   return {
  //     status: false,
  //     message: "user already exists",
  //   };
  // }
  let userObj = {
    name: name,
    email: email,
    password: password,
  };

  //Create Activation token

  const createActivationToken = (user) => {
    return jwt.sign({ user }, process.env.ACTIVATION_SECRET, {
      expiresIn: "5m",
    });
  };

  const activationToken = createActivationToken(userObj);
  const activationUrl = `http://localhost:3000/auth/activation/${activationToken}`;

  try {
    await sendMail({
      email: userObj.email,
      subject: "Account activation",
      message: `Hey ${userObj.name} please click on the link to activate your Canteen  account ${activationUrl}`,
    });
    return {
      status: true,
      message: `Please check ${userObj.email}`,
    };
  } catch (error) {
    console.log(error);
  }

  // user = await User.create({
  //   name,
  //   email,
  //   password,
  // });
  // console.log("user created");
  // return {
  //   status: true,
  //   message: "account created",
  //   data: activationToken,
  // };
};

//activation

const userActivation = async (token) => {
  console.log("activation");
  // Verify the activation token
  try {
    const decoded = jwt.verify(token, process.env.ACTIVATION_SECRET);
    console.log(decoded.user.email);

    // Find the user associated with the token
    const { name, email, password } = decoded.user;
    const user = await User.findOne({ email: decoded.user.email });

    // Check if the user is already activated
    if (user) {
      // return res.status(200).json({ message: "Account is already activated." });
      return {
        status: true,
        message: "Account is already activated",
      };
    }

    // Activate the user account (update the database)
    // user = true;
    await User.create({
      name,
      email,
      password,
    });

    // Optionally, you can redirect the user or show a success message
    // return res.status(200).json({ message: "Account successfully activated." });
    return {
      status: true,
      message: "Account activated Successfully",
    };
  } catch (error) {
    // Handle token verification errors or other exceptions
    console.error(error);
    // return res.status(400).json({ message: "Invalid activation token." });
    return {
      status: false,
      message: "Invalid activation token",
    };
  }
};

module.exports = { userRegister, userActivation };
