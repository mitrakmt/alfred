let User = require('./db/User')
let bcrypt = require('bcrypt')
let Helpers = {}

Helpers.checkEmailValidity = (email) => {
  User.findOne({
    'email': email
  })
  .then((result) => {
    if (result) {
      return false
    } else {
      return true
    }
  })
}

module.exports = Helpers
