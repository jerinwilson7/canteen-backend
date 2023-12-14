var express = require("express");
const { adminLogin, adminRegister } = require("../Services/adminAuthServices");
const { upload } = require("../multer");
const {addFood, getAllProducts } = require("../Services/productServices");
var router = express.Router();

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

    const { name,title, category, description, quantity, price } = req.body;

    const file = req.file;


    const response = await addFood({
      name,
      title,
      category,
      description,
      quantity,
      price,
      foodImage: {
        filename: file.filename, 
        path: file.path,
      },
    });

    console.log(response)
  } catch (error) {
    console.log(error)
  }
})

router.get('/get-all-products',async(req,res)=>{
  console.log('getprod')
  const response = await getAllProducts()
  res.send(response)
  console.log(response)
})



module.exports = router;
   