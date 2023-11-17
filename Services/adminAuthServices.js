const Admin = require("../models/Admin");

const adminLogin = async (admin) => {
  //login initiated complete it later
  const { name, password } = admin;
  try {
    console.log(name);
    const adminExist = await Admin.findOne({ name }).select("+password");
    if (adminExist) {
      console.log("exist");
    } else {
      console.log("no admin");
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
