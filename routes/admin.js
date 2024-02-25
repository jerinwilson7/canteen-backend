var express = require("express");
const { adminLogin, adminRegister } = require("../Services/adminAuthServices");
const { upload } = require("../multer");
const { addFood, getAllProducts } = require("../Services/productServices");
const { getAllOrders } = require("../Services/orderServices");
const { getAllUsers } = require("../Services/userServices");
var router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/* GET home page. */
router.post("/create-admin", async function (req, res, next) {
  try {
    const response = await adminRegister(req.body);

    return res.render(response);
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  const response = await adminLogin(req.body);
  res.json(response);
});

router.post("/add-product", upload.single("file"), async (req, res) => {
  try {
    console.log(req.body);
    const { name, title, category, description, quantity, price, file } =
      req.body;

    const response = await addFood({
      name,
      title,
      category,
      description,
      quantity,
      price,
      file,
    });

    console.log(response);
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-all-products", async (req, res) => {
  const response = await getAllProducts();
  res.send(response);
});
router.get("/log", async (req, res) => {
  console.log("first");
});

router.get("/orders", async (req, res) => {
  const response = await getAllOrders();
  res.json(response);
});

router.get("/all-users", async (req, res) => {
  const response = await getAllUsers();
  res.json(response);
});

module.exports = router;
