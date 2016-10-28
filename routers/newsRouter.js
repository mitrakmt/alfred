let newsRouter = require('express').Router()
let newsController = require('../controllers/newsController')

newsRouter.get('/', newsController.GET)

module.exports = newsRouter;
