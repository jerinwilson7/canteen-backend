const Admin = require("../models/Admin");

const adminLogin = (userName) => {
  console.log(userName);
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
