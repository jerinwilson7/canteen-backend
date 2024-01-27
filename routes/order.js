var express = require("express");
const { placeOrder } = require("../Services/orderServices");
var router = express.Router();

router.post("/place-order",async(req,res)=>{

    try {

        const userEmail = req.email        
        let response = await placeOrder(req.body,userEmail)
        console.log("order"+response)
        res.json(response)

    } catch (error) {
        console.log(error)
    }
    
    
     
})



module.exports = router;
