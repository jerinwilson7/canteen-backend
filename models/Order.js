const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
    required: true,
  },
],

  
  totalAmount: {
    type: Number,
    required: true,
  },

  paymentId: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Order", orderSchema);
