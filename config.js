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
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        console.error(err)
        return false
      } else {
        return hash
      }
    })
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
