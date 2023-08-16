const mongoose = require("mongoose");


const ordersSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    foodOrderData:{
        type:Array,
        required:true,
    },
   
})


const Orders = mongoose.model('order',ordersSchema);
module.exports = Orders;