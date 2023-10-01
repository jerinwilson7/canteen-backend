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
      message: `Hey ${userObj.name} please click on the link to activate your account ${activationUrl}`,
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

const userActivation = () => {
  console.log("activation");
};

module.exports = { userRegister, userActivation };
