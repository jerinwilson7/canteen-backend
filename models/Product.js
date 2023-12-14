const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

  category: {
    type: String,

  },

  description: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  foodImage:{
     filename: String,
    path: String
  }

});

module.exports = mongoose.model("Product", productSchema);
