const Usuario = require('../models/usuario')
const moongose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports ={
        // Controller para cadastrar um novo Usuário.
        async cadastro(req,res){
            const { nome, email, dataNasc, senha, repSenha } = req.body

            try{
                // Compara os campos "senha" e "repSenha".
                if(senha !== repSenha) return res.status(401).json({ msg: 'Senha incorreta, tente novamente' })

                // Cria um usuário e salva no banco de dados.
                Usuario.create({ nome,email,dataNasc,senha })
                try{
                    res.json({ msg: 'Cadastro realizado com sucesso' })
                }catch(err){
                    console.error(err)
                    res.status(500).json({msg: 'erro ao cadastrar usuário' })
                }

            }catch(err){
                console.log(err)
            } 
        },
        //Rota para logar o usuário com base no email e senha.
        async loginPost(req, res) {
            const { email, senha } = req.body;

            try{
                const usuario = await Usuario.findOne({ email })
                if(!usuario) return res.status(404).json({ msg: 'Usuario nao encotrado' })

                const bcryptSenha = await bcrypt.compare(senha, usuario.senha)
                if(!bcryptSenha) return res.status(401).json({ msg: 'Senha Incorreta!' })
                
                const token = jwt.sign({ id:usuario.id }, process.env.JWT_SECRET, { expiresIn: '5s' } )
                return res.json({token})
            }catch(err){
                console.error(err)
                return res.status(500).json({ msg: 'Erro interno ao realizar o login' })
            }
        },
        //Renderiza a página ao fazer o login
        profilePage(req,res){
            res.render('pages/profilePage')
        },
        //Responsável por verificar verificação do token.
        async profile(req,res){
            try {
                const usuario = await Usuario.findById(req.userId).select('-senha')
                if (!usuario) return res.status(404).json({ msg: 'Usuário não encontrado' })
                return res.json(usuario)
            } catch (err) {
                console.error(err)
                return res.status(500).json({ msg: 'Erro ao carregar perfil' })
            }   
        }
    }
