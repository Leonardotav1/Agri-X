const usuario = require("../models/usuario")

module.exports = (app, usuarioController, authMiddleware)=>{
    app.post("/cadastro", usuarioController.cadastro)
    app.post("/loginPost", usuarioController.loginPost)
    app.get("/profilePage", usuarioController.profilePage)
    app.get("/profile",authMiddleware, usuarioController.profile)
}