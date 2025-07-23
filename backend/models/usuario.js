const mongoose = require('../config/db')
const bcrypt = require('bcrypt')

    //Criação do objeto Usuario, com todos os atributos.
    const UsuarioSchema = new mongoose.Schema({
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        senha:{
            type:String,
            required:true
        },
    })

module.exports = mongoose.model('Usuario', UsuarioSchema)