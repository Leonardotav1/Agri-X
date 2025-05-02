// Importação dos módulos.
const express = require('express')
const consign = require('consign')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')

//Configurações
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Caminho para a pasta 'views'
app.set('views', path.join(__dirname,'views'))

//Configuração da engine handlebars
app.engine('hbs', exphbs.engine({
    extname:'.hbs', // Definindo a extensão de arquivos como '.hbs'.
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
  }))
// Definindo o handlebars como engine.
app.set('view engine', 'hbs') 

// Definindo a pasta 'Frontend' como estática.
app.use(express.static(path.join(__dirname,'../Frontend')))


// Usando o consign para carregar as pastas com os scripts.
consign()
    .include('models')
    .then('controllers')
    .then('routes')
    .into(app)

// Colocando o servidor no ar.
app.listen(3000,()=>{
    console.log("Servidor rodando na porta: http://localhost:3000")
})