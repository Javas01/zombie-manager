const { gql } = require('apollo-server-express')

const typeDefs = gql`
  schema {
    query: Query
    mutation: Mutation
  }
  type Zombie {
    id: String!
    name: String!
    location: String!
  }
  type Query {
    zombies: [Zombie!]!
  }
  type Mutation {
    createZombie(id: String!, name: String!, location: String!): Zombie!
    deleteZombie(id: String!): Zombie!
    editZombie(id: String!, name: String, location: String): Zombie!
  }
`

module.exports = typeDefs
