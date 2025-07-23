module.exports = (app, homeRoutes, authMiddleware)=>{
    app.get("/", homeRoutes.index);
    app.get("/login", homeRoutes.login);
    app.get("/sigin", homeRoutes.sigin);
    app.get("/homePage",  homeRoutes.homePage)
}   