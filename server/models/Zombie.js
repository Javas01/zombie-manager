const mongoose = require('mongoose')

const zombieSchema = new mongoose.Schema({
  id: String,
  name: String,
  location: String
})

const Zombie = mongoose.model('Zombie', zombieSchema)

module.exports = Zombie
