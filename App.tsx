import React from 'react';
import Navigation from './src/navigation';
import {Provider as EntriesContext} from './src/context/clientsContext';

function App(): JSX.Element {
  return (
    <EntriesContext>
      <Navigation />
    </EntriesContext>
  );
}

export default App;
