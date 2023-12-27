const { default: mongoose } = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    quantity:{
        type:Number,
        default: 1
    },


})

const CartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    
    items:{cartItemSchema}
    
})

module.exports = mongoose.model("Cart", CartSchema);
