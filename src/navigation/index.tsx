import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import LogIn from '../screens/LogIn';
import Home from '../screens/Home';
import ClientDetail from '../screens/ClientDetail';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Splash"
          component={Splash}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="LogIn"
          component={LogIn}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Clientes',
          }}
        />
        <Stack.Screen
          name="ClientDetail"
          component={ClientDetail}
          options={{
            title: 'Detalle del cliente',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
