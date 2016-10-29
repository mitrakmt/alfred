let stockController = {}
let User = require('../db/User')

stockController.GET = (req, res) => {
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

stockController.POST = (req, res) => {

}

module.exports = stockController
