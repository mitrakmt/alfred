let newsRouter = require('express').Router()
let newsController = require('../controllers/newsController')

newsRouter.get('/', newsController.GET_NEWS)
newsRouter.get('/:stockId', newsController.GET_STOCK_NEWS)

module.exports = newsRouter
