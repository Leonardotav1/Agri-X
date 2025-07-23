const Usuario = require('../models/usuario')
const moongose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/authMiddleware')
const usuario = require('../models/usuario')

module.exports ={
        // Controller para cadastrar um novo Usuário.
        async cadastro(req,res){
            const { name, email, senha, repSenha } = req.body

            try{
                // Compara os campos "senha" e "repSenha".
                if(senha !== repSenha) return res.status(401).json({ msg: 'Senha incorreta, tente novamente' })

                if(await usuario.findOne({email})) return res.status(401).json({ msg: 'Já existe um usuário com esse email!' })

                try{
                    //Criptografia de senha
                    const salt = await bcrypt.genSalt()
                    const hashPass = await bcrypt.hash(senha, salt)

                    // Cria um usuário e salva no banco de dados.
                    Usuario.create({ 
                        name,
                        email,
                        senha: hashPass 
                    })
                    res.json({ msg: 'Cadastro realizado com sucesso' })
                }catch(err){
                    console.error(err)
                    res.status(500).json({msg: 'Erro ao cadastrar usuário' })
                }

            }catch(err){
                console.log(err)
            } 
        },
        //Rota para logar o usuário com base no email e senha.
        async connect(req, res) {
            const { email, senha } = req.body;

            try{
                const usuario = await Usuario.findOne({email})
                if(!usuario) return res.status(404).json({ msg: 'Usuário não encontrado' })

                const bcryptSenha = await bcrypt.compare(senha, usuario.senha)
                if(!bcryptSenha) return res.status(401).json({ msg: 'Senha incorreta!' })
                
                const token = jwt.sign(
                    { id:usuario.id }, 
                    process.env.JWT_SECRET, 
                    { expiresIn: '7d'} 
                )
                return res.json({token})

            }catch(err){
                console.error(err)
                return res.status(500).json({ msg: 'Erro interno ao realizar o login' })
            }
        },
        async profile(req,res) {
           try{
                const usuario = await Usuario.findById(req.userId).select('-senha')
                if(!usuario) return res.status(404).json({ msg:"Usuario não encontrado" })
                return res.json(usuario)
           } catch(err){
                console.error(err)
           }
        }
        
    }
