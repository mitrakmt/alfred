let User = require('./db/User')
let Helpers = {}

  Helpers.checkEmailValidity = function (email) {
    User.findOne({
      "email": email
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
