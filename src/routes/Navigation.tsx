import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Authentication from './Authentication';
// import Home from './Home';
import HomeTabs from './HomeTabs';
import { NavigationContainer } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Authentication: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Authentication" component={Authentication} />
        <Stack.Screen name="Home" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


