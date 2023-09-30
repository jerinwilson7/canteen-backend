const User = require("../models/User");

const userRegister = async (user) => {
  const { name, email, password } = user;
  try {
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      console.log("User Already Exists");
      return {
        status: false,
        message: "user already exists",
      };
    }
    user = await User.create({
      name,
      email,
      password,
    });
    console.log("user created");
    return {
      status: true,
      message: "account created",
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { userRegister };
