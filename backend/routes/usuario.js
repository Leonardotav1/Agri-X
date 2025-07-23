const usuario = require("../models/usuario")

module.exports = (app, usuarioController, authMiddleware)=>{
    app.post("/cadastro", usuarioController.cadastro)
    app.post("/connect", usuarioController.connect)
    app.get("/profile", authMiddleware, usuarioController.profile)
}   