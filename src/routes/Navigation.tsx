import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Authentication from './Authentication';
import Home from './Home';
import { NavigationContainer } from '@react-navigation/native';

export default function Navigation() {

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={Authentication} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export type RootStackParamList = {
  Home: undefined;
  Authentication: undefined;
};