module.exports = (app)=>{
    var HomeController = {
        index(req,res){
            res.render('layouts/main')
        }
    }

    return HomeController
}