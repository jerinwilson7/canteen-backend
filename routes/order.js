var express = require("express");
var router = express.Router();

router.post("/place-order",async(req,res)=>{
    console.log(req.body)
    return "received"
    
})



module.exports = router;
