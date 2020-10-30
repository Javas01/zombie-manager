const Zombie = require('./models/Zombie')

const resolvers = {
  Query: {
    zombies: () => Zombie.find()
  },
  Mutation: {
    createZombie: async (_, { name, location }) => {
      const zombie = new Zombie({ name, location })
      await zombie.save()
      return zombie
    },
    deleteZombie: async (_, { id }) => {
      return await Zombie.findByIdAndDelete(id)
    },
    editZombie: async (_, { id, name, location }) => {
      if (name === undefined) {
        const zombie = await Zombie.findById(id)
        name = zombie.name
      }
      if (location === undefined) {
        const zombie = await Zombie.findById(id)
        location = zombie.location
      }
      return await Zombie.findByIdAndUpdate(id, { name: name, location: location })
    }
  }
}

module.exports = resolvers
