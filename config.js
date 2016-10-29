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

Helpers.hashPassword = (password) => {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error(err)
      return false
    } else {
      return hash
    }
  })
}

module.exports = Helpers
