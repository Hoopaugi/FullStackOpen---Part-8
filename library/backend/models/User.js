const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3
  },
  favoriteGenre: {
    type: String
  }
})

const User = mongoose.model('User', schema)

module.exports = User