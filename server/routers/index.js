const Router = require('express').Router()
const users = require('./userRouter')
const stocks = require('./stockRouter')
const news = require('./newsRouter')

Router.use('/users', users)
Router.use('/stocks', stocks)
Router.use('/news', news)

module.exports = Router
