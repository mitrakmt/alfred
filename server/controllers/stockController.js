let stockController = {}
let User = require('../db/User')
let _ = require('lodash')
let cryptojs = require('crypto-js')

stockController.GET_STOCKS = (req, res) => {
  User.findOne({
    '_id': req.headers.id
  })
  .then((user) => {
    res.status(200).send(user.stocks)
  })
  .catch((err) => {
    res.status(400).send(err)
  })
}

stockController.ADD_STOCK = (req, res) => {
  let stock = req.body.stockTicker
  User.findOne({
    '_id': req.headers.id
  })
  .then((user) => {
    user.stocks.push(stock)
    user.save((err, user) => {
      if (err) {
        res.status(500).send(err)
      }
      res.status(200).send(user)
    })
  })
}

stockController.REMOVE_STOCK = (req, res) => {
  let stock = req.body.stockTicker
  User.findOne({
    '_id': req.headers.id
  })
  .then((user) => {
    user.stocks.pull(stock)
    user.save((err, user) => {
      if (err) {
        res.status(500).send(err)
      }
      res.status(200).send(user)
    })
  })
}

module.exports = stockController
