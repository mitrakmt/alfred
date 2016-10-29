let stockRouter = require('express').Router()
let stockController = require('../controllers/stockController')

stockRouter.get('/', stockController.GET)

module.exports = stockRouter
