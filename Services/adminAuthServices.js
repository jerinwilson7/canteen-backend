const Admin = require("../models/Admin");

const adminLogin = async (adminObj) => {
  //login initiated complete it later
  const { email, password } = adminObj;
  try {
    console.log(email);
    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      console.log("!admin");
      return {
        status: 404,
        stat: false,
        message: "No Account",
      };
    }

    console.log("email");
    const isPasswordValid = await admin.comparePassword(
      password,
      admin.password
    );

    if (!isPasswordValid) {
      console.log("!pass");
      return {
        status: 404,
        stat: false,
        message: "please provide correct information",
      };
    }
    console.log("exists");
    return {
      status: 200,
      stat: true,
      message: "Account Exists",
    };
  } catch (error) {
    console.log(error);
  }
};

const adminRegister = async (user) => {
  const { email, password } = user;

  try {
    const admin = await Admin.create({
      email,
      password,
    });

    return {
      status: true,
      message: "Account activated Successfully",
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { adminLogin, adminRegister };
