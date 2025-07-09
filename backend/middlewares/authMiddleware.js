const jwt = require('jsonwebtoken')

//Exportado modulo para autenticação via token.
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization
    
    if (!authHeader) {
        return res.status(401).json({ msg: 'Token ausente' })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id
        next()
    }catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ msg: 'Token expirado' })
        }
        return res.status(403).json({ msg: 'Token inválido' })
    }
}
