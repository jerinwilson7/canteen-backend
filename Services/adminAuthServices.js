const Admin = require("../models/Admin");

const adminLogin = async (admin) => {
  //login initiated complete it later
  const { name, password } = admin;
  try {
    console.log(name);
    const adminExist = await Admin.findOne({ name }).select("+password");
    if (adminExist) {
      console.log("exist");
      return {
        status: 200,
        stat: true,
        message: "Account Exists",
      };
    } else {
      console.log("no admin");
      return {
        status: 404,
        stat: false,
        message: "No Account",
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const adminRegister = async (user) => {
  const { name, password } = user;

  try {
    let adminObj = {
      name: name,
      password: password,
    };

    const admin = await Admin.create({
      name,
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
