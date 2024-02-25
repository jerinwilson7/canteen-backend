const Cart = require("../models/Cart");
const Order = require("../models/Order");
const User = require("../models/User");
const { getCartItems, removeFromCart, deleteCart } = require("./cartServices");

const placeOrder = async (data, userEmail) => {
  try {
    return new Promise(async (resolve, reject) => {
      const { paymentId } = data;
      const user = await User.findOne({ email: userEmail });
      let userId = user.id;
      let userName = user.name;
      console.log(userId);

      const cartResponse = await getCartItems({ userEmail });
      const cartItems = cartResponse.data.cartItems;
      const totalAmount = cartResponse.data.metaData.itemsTotal;

      const orderItems = cartItems.map((cartItem) => {
        return {
          name: cartItem.food.name,
          quantity: cartItem.quantity,
          price: cartItem.food.price,
          image: cartItem.food.file,
        };
      });

      const orderObject = {
        user: userId,
        email: userEmail,
        userName: userName,
        items: orderItems,
        totalAmount: totalAmount,
        paymentId: paymentId,
      };
      await Order.create(orderObject).then((res) => {
        deleteCart({ userEmail });
        const orderPromise = {
          status: true,
          data: res,
          message: "order success",
        };
        resolve(orderPromise);
      });
    });
  } catch (error) {
    console.log("placeOrder error : " + error);
    return {
      status: false,
      error: error,
      message: "order failed",
    };
  }
};

const getUserOrders = async (userEmail) => {
  try {
    console.log(userEmail);
    return new Promise(async (resolve, reject) => {
      const user = await User.findOne({ email: userEmail });

      let userId = user.id;

      const order = await Order.findOne({ user: userId });
      console.log("getorder");
      const food = await Cart.findOne({ _id: order.items });

      console.log(food);
      console.log(order.items.name);
      resolve(order);
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllOrders = async () => {
  try {
    return new Promise(async (resolve, reject) => {
      const allOrders = await Order.find();
      resolve(allOrders);
    });
  } catch (error) {
    console.log("all order error :" + error);
  }
};

module.exports = { placeOrder, getUserOrders, getAllOrders };
