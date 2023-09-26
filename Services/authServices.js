const User = require("../models/User");

const userRegister = async (user) => {
  const { name, email, password } = user;
  try {
    // let userObject = {
    //   name: user.name,
    //   email: user.email,
    //   password: user.password,
    // };
    console.log(name);

    const userEmail = await User.findOne({ email });
    if (userEmail) {
      console.log("already exists");
      return "user already exists";
    }

    user = await User.create({
      name,
      email,
      password,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { userRegister };
