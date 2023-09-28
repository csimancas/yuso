import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LogIn from '../screens/LogIn';
import Home from '../screens/Home';
import ClientDetail from '../screens/ClientDetail';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LogIn">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="LogIn"
          component={LogIn}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ClientDetail" component={ClientDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
