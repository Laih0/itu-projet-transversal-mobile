import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Authentication from './Authentication';
import Home from './Home';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Authentication" component={Authentication} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
