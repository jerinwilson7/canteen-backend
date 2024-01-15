var express = require("express");
require('dotenv').config()
var router = express.Router();

const STRIPE_SECRET_KEY ='sk_test_51MrFMwSBc6dGAcRgAeaBpLE1tLvxbMTFHVFOUzIkB1SYGebkeR6BR6qo2TdIeQs1TJIknBrcvzCuGygwvDfAVV3V002Skr4SYZ'

const stripe = require('stripe')(STRIPE_SECRET_KEY)
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

router.post("/",async(req,res)=>{
    try {
       let amount = req.body.amount
        console.log(amount)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount*100,
            currency: 'inr',
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
           payment_method_types:["card"]
          });
          const clientSecret = paymentIntent.client_secret
          res.json({
           clientSecret
          })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
