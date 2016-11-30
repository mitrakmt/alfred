let stockController = {}
let stockModel = require('../models/stock')
let User = require('../db/User')
let _ = require('lodash')
let cryptojs = require('crypto-js')

stockController.GET_STOCKS = (req, res) => {
  let userid = req.headers.userid

  stockModel.GET_STOCKS(userid)
    .then(response => {
      if (response.err) {
        res.status(500).send({
          err: err
        })
      }

      res.status(200).send({
        stocks: response.stocks,
        favoriteStocks: response.favoriteStocks
      })
    })
}

stockController.ADD_STOCK = (req, res) => {
  let stock = req.body.stockTicker
  let userid = req.headers.userid

  stockModel.ADD_STOCK(userid, stock)
    .then(response => {
      if (response.err) {
        res.status(500).send({
          err: err
        })
      }

      res.status(200).send({
        stocks: response.stocks
      })
    })
}

stockController.UPDATE_FAVORITE_STOCK = (req, res) => {
  let stock = req.body.stockTicker
  let userid = req.headers.userid

  stockModel.UPDATE_FAVORITE_STOCK(userid, stock)
    .then(response => {
      if (response.err) {
        res.status(500).send({
          err: err
        })
      }

      res.status(200).send({
        stocks: response.stocks
      })      
    })
}

stockController.REMOVE_STOCK = (req, res) => {
  let stock = req.body.stockTicker
  let userid = req.headers.userid

  stockModel.REMOVE_STOCK(userid, stock)
    .then(response => {
      if (response.err) {
        res.status(500).send({
          err: err
        })
      }

      res.status(200).send({
        stocks: response.stocks
      })      
    })
}

module.exports = stockController
