// Importação dos módulos.
const express = require('express')
const mongoose = require('mongoose')
const consign = require('consign')
const app = express()
const path = require('path')
const exphbs = require('express-handlebars')

//Configurações gerais
app.use(express.json())
app.use(express.urlencoded({extended:true}))
require('dotenv').config()

//Configuração da engine handlebars
app.engine('hbs', exphbs.engine({
    extname:'.hbs', // Definindo a extensão de arquivos como '.hbs'.
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'), // Definindo a pasta de partials.
  }))

app.set('view engine', 'hbs') // Definindo o handlebars como view engine.
app.set('views', path.join(__dirname, 'views')) // Definindo a pasta de views.
app.set('view cache', false) // Desabilitando o cache do handlebars.

// Definindo a pasta 'Frontend' como estática.
app.use(express.static(path.join(__dirname,'../Frontend')))

// Importando middleware de autenticação.
const authMiddleware = require('./middlewares/authMiddleware')

//Importando controladores de funcionalidades.
const usuarioController = require('./controllers/usuario')
const homeController = require('./controllers/home')

//Definindo as rotas e passando variáveis com app e controladores.
const usuarioRoutes = require('./routes/usuario')(app, usuarioController, authMiddleware)
const homeRoutes = require('./routes/home')(app, homeController)

// Colocando o servidor no ar.
app.listen(3000,()=>{
    console.log("Servidor rodando na porta: http://localhost:3000")
})