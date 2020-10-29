const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const express = require('express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  server.applyMiddleware({ app });

  await mongoose.connect("mongodb+srv://jawwaad:01_Eerbas@zombie-manager.ljbo3.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();