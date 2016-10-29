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

Helpers.checkPassword = (password, hashedPass) => {
  bcrypt.compare(password, hashedPass, (err, equal) => {
    if (equal) {
      return true
    } else {
      return false
    }
  })
}

module.exports = Helpers
