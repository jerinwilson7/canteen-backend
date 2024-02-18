var express = require("express");
const { placeOrder, getUserOrders } = require("../Services/orderServices");
var router = express.Router();

router.post("/place-order",async(req,res)=>{

    try {

        const userEmail = req.email        
        let response = await placeOrder(req.body,userEmail)
        console.log(response.message )
        return response
        // res.json(response)

    } catch (error) {
        console.log(error)
    }
    
    
      
})

router.get("/",async(req,res)=>{
    try {
        const userEmail = req.email
        const response = await getUserOrders(userEmail)
        res.json(response)
    } catch (error) {
        console.log(error)
    }
})



module.exports = router;
