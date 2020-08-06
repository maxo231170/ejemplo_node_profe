const usersModels = require("../models/usersModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
module.exports={
    registro: async function(req, res, next) {
        try{
            let documento = await usersModels.create({ 
                name: req.body.name, 
                user: req.body.user, 
                password: req.body.password }
            )
            res.json(documento)
        }catch(e){
            next(e)
        }
        
        
    },
    login: async function(req, res, next) {
        try{
            let usuario = await usersModels.findOne({user:req.body.user})
            if(usuario){
                if(bcrypt.compareSync(req.body.password,usuario.password)){
                    const token = jwt.sign({usuario:usuario._id},req.app.get('secretKey'),{expiresIn:'1h'})
                    res.json({token:token})
                }else{
                    res.json({mensaje:"Contraseña incorrecta"})
                }
            }else{
                res.json({mensaje:"Usuario incorrecto"})
            }

        }catch(e){
            next(e)
        }
    }
}