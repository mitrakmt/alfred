let stockRouter = require('express').Router()
let stockController = require('../controllers/stockController')

stockRouter.get('/', stockController.GET_STOCKS)
stockRouter.post('/', stockController.ADD_STOCK)
stockRouter.delete('/', stockController.REMOVE_STOCK)

module.exports = stockRouter
