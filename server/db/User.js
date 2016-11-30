var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  stocks: [String],
  favoriteStocks: [Array]
})

module.exports = mongoose.model('User', userSchema)
