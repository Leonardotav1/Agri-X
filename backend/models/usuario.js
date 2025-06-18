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
    
    // Utilização do bcrypt para criptografar a senha antes de enviar para o Banco de Dados.
    UsuarioSchema.pre('save', function (next){
        if(!this.isModified('senha')) return next() // Verifica se a senha foi alterada

        const usuario = this

        //Gera o "sal" para a senha, 10 é o numero de rounds de segurança, salt é uma string aleatória que será usada para embaralhar a senha.
        bcrypt.genSalt(10, function (err, salt){
            if (err) return next(err)

                //Criptografa a senha usando o salt, "hash" sera a versão criptografada da senha.
                bcrypt.hash(usuario.senha, salt, function (err, hash){
                    if(err) return next(err)

                    usuario.senha = hash
                    next()
                })
        })
    })

module.exports = mongoose.model('Usuario', UsuarioSchema)