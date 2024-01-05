var express = require("express");
const { addToCart, removeFromCart, getCartItems } = require("../Services/cartServices");
var router = express.Router();

router.get("/", async (req, res) => {
    let userEmail = req.email
    // let {food_id} = req.params
    let response = await getCartItems({userEmail})
    console.log(response)
    res.json(response)
});


router.post("/:food_id", async (req, res) => {
    try {
        let userEmail = req.email
        let {food_id} = req.params
        
        let response = await addToCart({food_id,userEmail})
        console.log("ADD: "+response)
     res.json(response)
    } catch (error) {
        console.log(error)
    }
   
});

router.delete('/:food_id',async(req,res)=>{
    let userEmail = req.email
    console.log(userEmail)
    let {food_id} = req.params
    let response = await removeFromCart({food_id,userEmail})
    console.log("DEL :"+response)

    res.json(response)
})
module.exports = router;
 