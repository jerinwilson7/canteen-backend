const User = require("../models/User");

const userRegister = async (user) => {
  console.log("userRef");
  console.log(user.email);
  try {
    let userObject = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    console.log(userObject.email);
    const userEmail = await User.findOne({ email: userObject.email });
    if (userEmail) {
      console.log("already exists");
      console.log(userObject);
    } else {
      console.log("new email");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { userRegister };
