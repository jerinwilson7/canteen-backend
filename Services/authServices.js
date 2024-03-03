const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendMail = require("../utils/SendMail");
const ErrorHandler = require("../utils/ErrorHandler");
const sendToken = require("../utils/jwtToken");

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
  const activationUrl = `http://localhost:8000/auth/activation/${activationToken}`;

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

const userActivation = async (token, res) => {
  // Verify the activation token
  try {
    const decoded = jwt.verify(token, process.env.ACTIVATION_SECRET);

    // Find the user associated with the token
    const { name, email, password } = decoded.user;
    const userExist = await User.findOne({ email: decoded.user.email });

    // Check if the user is already activated
    if (userExist) {
      // return res.status(200).json({ message: "Account is already activated." });
      return {
        status: true,
        title: "Email Validation Failed",
        message: "Account is already activated",
        name: name,
        action: "Please login to continue",
      };
    }

    // Activate the user account (update the database)
    const user = await User.create({
      name,
      email,
      password,
    });

    return {
      status: true,
      title: "Email Validation Success",
      message: "Account activated Successfully",
      name: name,
      action: "Please login to continue",
    };
  } catch (error) {
    // Handle token verification errors or other exceptions
    console.error(error);
    // return res.status(400).json({ message: "Invalid activation token." });
    return {
      status: false,
      title: "Email Validation Failed",
      message: "Invalid activation token",
      action: "Please try again",
    };
  }
};

const userLogin = async (userObj) => {
  const { email, password } = userObj;
  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      console.log("No account");
      return {
        status: 404,
        message: "No Account",
      };
    }

    const isPasswordValid = await user.comparePassword(password, user.password);

    if (!isPasswordValid) {
      console.log("password error");
      return {
        status: "false",
        message: "pas error",
      };
    }
    let token = jwt.sign({ email: email }, process.env.ACTIVATION_SECRET, {
      expiresIn: "24h",
    });
    return {
      status: 200,
      message: "Login Success",
      token: token,
    };
  } catch (error) {
    console.log(error);
  }
};

const tokenVerification = async (req, res, next) => {
  console.log(`tokenVerification | ${req.originalUrl}`);
  try {
    if (
      req.originalUrl.endsWith("/login") ||
      req.originalUrl.endsWith("/create-user") ||
      req.originalUrl.endsWith("/create-admin") ||
      req.originalUrl.endsWith("/admin/login") ||
      req.originalUrl.endsWith("/admin/add-product") ||
      req.originalUrl.endsWith("/admin/get-products") ||
      req.originalUrl.includes("/activation") ||
      req.originalUrl.includes("/FoodImages") ||
      req.originalUrl.includes("/admin") ||
      req.originalUrl.includes("/payment") ||
      req.originalUrl.includes("/api/products") ||
      req?.originalUrl.includes("/refresh-token")
    ) {
      return next();
    }
    let token = req.headers["authorization"];
    if (token && token.startsWith("Bearer")) {
      token = token.slice(7, token.length);
      jwt.verify(token, process.env.ACTIVATION_SECRET, (error, decoded) => {
        if (error) {
          console.log(error);

          res.status(200).json({
            status: false,
            message: error?.name ? error?.name : "Invalid Token",
            error: `Invalid token | ${error?.message}`,
          });
        } else {
          req["email"] = decoded.email;
          next();
        }
      });
    } else {
      res.status(401).json({
        status: false,
        message: "Token is missing",
        error: "Token is missing",
      });
    }
  } catch (error) {
    res.status(401).json({
      status: false,
      message: error?.message ? error?.message : "Authentication failed",
      error: `Authentication failed | ${error?.message}`,
    });
  }
};

const tokenRefresh = async (req, res, next) => {
  try {
    console.log(`token refresh | ${req.originalUrl}`);
    let token = req.headers["authorization"];
    console.log("tokenre" + token);
    if (token && token.startsWith("Bearer")) {
      token = token.slice(7, token.length);
      console.log(token);
      jwt.verify(
        token,
        process.env.ACTIVATION_SECRET,
        { ignoreExpiration: true },
        (error, decoded) => {
          if (error) {
            console.log("err");
            res.status(200).json({
              status: false,
              message: error?.name ? error?.name : "Invalid Token",
              error: `Invalid token | ${error?.message}`,
            });
          } else {
            if (decoded.email) {
              let newToken = jwt.sign(
                {
                  email: decoded.email,
                },
                process.env.ACTIVATION_SECRET,
                { expiresIn: "24h" }
              );
              res.json({
                status: true,
                message: "token refresh success",
                data: newToken,
              });
            } else {
              console.log(error);
              res.status(401).json({
                status: false,
                message: "Invalid Token",
                error: `Invalid token | `,
              });
            }
          }
        }
      );
    } else {
      res.status(401).json({
        status: false,
        message: " Token missing",
        error: ` token missing |`,
      });
    }
  } catch (error) {
    res.status(401).json({
      status: false,
      message: error?.name ? error?.name : " Token refresh failed",
      error: `token refresh failed | ${error?.message}`,
    });
  }
};

module.exports = {
  userRegister,
  userActivation,
  userLogin,
  tokenVerification,
  tokenRefresh,
};
