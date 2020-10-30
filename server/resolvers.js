const Zombie = require('./models/Zombie')

const resolvers = {
  Query: {
    zombies: () => Zombie.find()
  },
  Mutation: {
    createZombie: async (_, { id, name, location }) => {
      const zombie = new Zombie({ id, name, location })
      await zombie.save()
      return zombie
    },
    deleteZombie: async (_, { id }) => {
      return await Zombie.findOneAndDelete({ id: id })
    },
    editZombie: async (_, { id, name, location }) => {
      if (name === undefined) {
        const zombie = await Zombie.findOne({ id: id })
        name = zombie.name
      }
      if (location === undefined) {
        const zombie = await Zombie.findOne({ id: id })
        location = zombie.location
      }
      const zombie = await Zombie.findOne({ id: id })
      zombie.id = id
      zombie.name = name
      zombie.location = location
      await zombie.save()
      return zombie
    }
  }
}

module.exports = resolvers
