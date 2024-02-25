const User = require("../models/User");

const getUser = async (email) => {
  try {
    let userObj = await User.findOne({ email });

    if (userObj) {
      return {
        status: true,
        message: "user found successfully",
        data: userObj,
      };
    } else {
      return {
        status: "false",
        message: "No user found",
      };
    }
  } catch (error) {
    return {
      status: "false",
      message: "user finding failed",
      error: `user finding failed ${error.message}`,
    };
  }
};

const getAllUsers = async () => {
  try {
    return new Promise(async (resolve, reject) => {
      const allUsers = await User.find();
      resolve(allUsers);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUser, getAllUsers };
