import React from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import LeaderBoard from './components/LeaderBoard';
import HeatMap from './components/HeatMap';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import HeatMapVer2 from './components/HeatMapVer2';

const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/89211/decentragraph/version/latest', 
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <LandingPage />
      <LeaderBoard />
      <HeatMapVer2 />

      
    </div>
    </ApolloProvider>
  );
}

export default App;