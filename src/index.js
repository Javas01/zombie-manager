import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ZombieProvider } from './contexts/ZombieContext'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ZombieProvider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </ZombieProvider>,
  document.getElementById('root')
);

