const mongoose = require('mongoose')
require("dotenv").config()

const uri = process.env.DB_URI
mongoose.connect(uri)

module.exports = mongoose
 
