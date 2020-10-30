const { gql } = require('apollo-server-express')

const typeDefs = gql`
  schema {
    query: Query
    mutation: Mutation
  }
  type Zombie {
    id: ID!
    name: String!
    location: String!
  }
  type Query {
    zombies: [Zombie!]!
  }
  type Mutation {
    createZombie(name: String!, location: String!): Zombie!
    deleteZombie(id: ID!): Zombie!
    editZombie(id: ID!, name: String, location: String): Zombie!
  }
`

module.exports = typeDefs
