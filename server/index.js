const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const express = require('express')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
require('dotenv').config()

const startServer = async () => {
  const app = express()

  const server = new ApolloServer({
    typeDefs,
    resolvers
  })

  server.applyMiddleware({ app })

  await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://test:m4yPqgwiPMqtaxdG@zombie-manager.ljbo3.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  )
}

startServer()
