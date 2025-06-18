module.exports = (app, homeRoutes)=>{
    app.get("/", homeRoutes.index);
    app.get("/login", homeRoutes.login);
    app.get("/sigin", homeRoutes.sigin);
} 