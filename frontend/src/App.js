import React from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import LeaderBoard from './components/LeaderBoard';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/89211/decentragraph/version/latest', // Replace with your subgraph URL
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <LandingPage />
      <LeaderBoard />
      
    </div>
    </ApolloProvider>
  );
}

export default App;
