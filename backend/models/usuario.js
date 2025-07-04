const mongoose = require('../config/db')
const bcrypt = require('bcrypt')

    //Criação do objeto Usuario, com todos os atributos.
    const UsuarioSchema = new mongoose.Schema({
        nome:{
            type:String,
            required:true
        },
        dataNasc:{
            type:Date,
            required:true,
            default: Date.now
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