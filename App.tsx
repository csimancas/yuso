import React from 'react';
import Navigation from './src/navigation';

import {DefaultTheme, Provider} from 'react-native-paper';

// default theme for app
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
      <Navigation />
    </Provider>
  );
}

export default App;
