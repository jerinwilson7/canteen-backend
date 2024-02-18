var express = require("express");
const { adminLogin, adminRegister } = require("../Services/adminAuthServices");
const { upload } = require("../multer");
const {addFood, getAllProducts } = require("../Services/productServices");
const { getAllOrders } = require("../Services/orderServices");
var router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


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

router.post('/add-product',upload.single('file'), async(req,res)=>{ 
  try {
            console.log(req.body)
    const { name,title, category, description, quantity, price ,file} = req.body;


    const response = await addFood({
      name,
      title,
      category,
      description,
      quantity, 
      price,
      file
    });
 
    console.log(response)
  } catch (error) {
    console.log(error)
  }
})
// router.post('/add-product',upload.single('file'), async(req,res)=>{ 
//   try {

//     const { name,title, category, description, quantity, price } = req.body;

//     const file = req.file;


//     const response = await addFood({
//       name,
//       title,
//       category,
//       description,
//       quantity,
//       price,
//       foodImage: {
//         filename: file.filename, 
//         path: file.path,
//       },
//     });

//     console.log(response)
//   } catch (error) {
//     console.log(error)
//   }
// })

// router.get('/get-all-products',async(req,res)=>{
//   const response = await getAllProducts()
//   res.send(response)
//   console.log(response)
// })

// router.get('/get-all-products', async (req, res) => {
//   try {
//     const products = await getAllProducts(); // Fetch products from the database
//     const productsWithImageURLs = products.map(product => {
//       return {
//         ...product.toJSON(), // Convert Mongoose document to plain JavaScript object
//         imageUrl: `http://localhost:8000/public/FoodImages/${product.foodImage.filename}` // Construct image URL
//       };
//     });
//     res.send(productsWithImageURLs); // Send products with image URLs to the frontend
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

router.get('/get-all-products',async(req,res)=>{
  const response = await getAllProducts()
  res.send(response)
}) 
router.get('/log',async(req,res)=>{
 console.log("first")
}) 


router.get('/orders',async(req,res)=>{
  const response = await getAllOrders()
  res.json(response)
})



module.exports = router;
   