let stockRouter = require('express').Router()
let stockController = require('../controllers/stockController')

stockRouter.route('/')
    .get(stockController.GET_STOCKS)
    .post(stockController.ADD_STOCK)
    .delete(stockController.REMOVE_STOCK)

stockRouter.route('/')
    .post(stockController.UPDATE_FAVORITE_STOCK)

module.exports = stockRouter
