const mongoose = require('mongoose')

const zombieSchema = new mongoose.Schema({
  name: String,
  location: String
})

const Zombie = mongoose.model('Zombie', zombieSchema)

module.exports = Zombie
