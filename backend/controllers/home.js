module.exports = {
    index(req,res){
        res.render('pages/apresentation',
            {showFooter:true,showHeader:true}
        )
    },
    login(req,res){
        res.render('pages/login')
    },
    sigin(req,res){
        res.render('pages/sigin')
    },
}
