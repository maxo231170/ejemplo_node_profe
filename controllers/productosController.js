const productosModel = require("../models/productosModels")

module.exports={
    getAll: async function(req, res, next) {
        console.log(req.query)
        console.log("UserToken",req.body.userToken)
        try{
            let productos = await productosModel.find({})

            res.json(productos)
        }catch(e){
            next(e)
        }
        
        
    },
    getById: async function(req, res, next) {
        console.log(req.params)
        
        try{
            let productos = await productosModel.findById(req.params.id)

            res.json(productos)
        }catch(e){
            next(e)
        }
    },
    create: async function(req,res,next){
        console.log(req.body)
        try{
            let producto = new productosModel({
                name:req.body.name,
                sku:req.body.sku,
                description:req.body.description,
                price:req.body.price,
                quantity:req.body.quantity
            })
            let documento = await producto.save()
            res.json(documento)
        }catch(e){
            next(e)
        }
        
    },
    update:async function(req,res,next){
        try{
            let producto = await productosModel.update({_id:req.params.id},req.body,{multi:false})
            res.json(producto)
        }catch(e){
            next(e)
        }
    },
    delete:async function(req,res,next){
        try{
            let producto = await productosModel.deleteOne({_id:req.params.id})
            res.json(producto)
        }catch(e){
            next(e)
        }
        res.send('dasdasdasdasd post');
    }
}