const mongoose = require('../bin/mongodb')

const productosSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        uppercase:true
    },
    sku:String,
    description:String,
    price:Number,
    quantity:Number
})

module.exports=mongoose.model("products",productosSchema);