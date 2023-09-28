import React from 'react';
import Home from './src/screens/Home';
import {Provider as EntriesContext} from './src/context/clientsContext';

function App(): JSX.Element {
  return (
    <EntriesContext>
      <Home />
    </EntriesContext>
  );
}

export default App;
