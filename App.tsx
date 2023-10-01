import React from 'react';
import Navigation from './src/navigation';
import {Provider as EntriesContext} from './src/context/clientsContext';
import {DefaultTheme, Provider} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1f1f1f',
    accent: '#f1f1f1',
  },
};
function App(): JSX.Element {
  return (
    <Provider theme={theme}>
      <EntriesContext>
        <Navigation />
      </EntriesContext>
    </Provider>
  );
}

export default App;
