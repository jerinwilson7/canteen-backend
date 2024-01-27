const Order = require("../models/Order")
const User = require("../models/User")
const { getCartItems, removeFromCart, deleteCart } = require("./cartServices")

const placeOrder = async(data,userEmail)=>{
    try {

       return new Promise(async(resolve,reject)=>{
        const {paymentId} = data
        const user = await User.findOne({email:userEmail})
        let userId = user.id
        console.log(userId)

        const cartResponse = await getCartItems({userEmail})
        console.log("cart "+cartResponse.data.cartItems.product)

        const orderObject ={
            user:userId,
            items:cartResponse.data.cartItems,
            totalAmount:cartResponse.data.metaData.itemsTotal,
            paymentId:paymentId
        }
        await Order.create(orderObject).then((res)=>{
            deleteCart({userId})
            const orderPromise ={

                data:res,
                message:"order success" 
            }
            resolve(orderPromise)
        })

            
       })
        
    } catch (error) { 
        console.log("placeOrder error : "+error)
    }
    
}

module.exports = {placeOrder}