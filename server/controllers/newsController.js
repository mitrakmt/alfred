let newsController = {}
let User = require('../db/User')

newsController.GET_NEWS = (req, res) => {
  User.findOne({
    _id: req.headers.id
  })
  .then((user) => {
    res.status(200).send('Return news results for user stocks')
  })
}

newsController.GET_STOCK_NEWS = (req, res) => {
  User.findOne({
    _id: req.headers.id
  })
  .then((user) => {
    res.status(200).send('Return news for specified stock')
  })
}

module.exports = newsController
