import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import CentersScreen from './screens/CentersScreen';
import AppointmentScreen from './screens/AppointmentScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

// Fonction séparée pour tabBarIcon
const getTabBarIcon = (routeName) => ({ color, size }) => {
  let iconName = "home";

  if (routeName === 'Accueil') iconName = 'home-outline';
  else if (routeName === 'Centres') iconName = 'medkit-outline';
  else if (routeName === 'RendezVous') iconName = 'calendar-outline';
  else if (routeName === 'Profil') iconName = 'person-outline';

  return <Ionicons name={iconName} size={size} color={color} />;
};

export default function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#2E7D32",
        tabBarInactiveTintColor: "#777",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 60,
          paddingBottom: 8,
          elevation: 5,
        },
        tabBarIcon: getTabBarIcon(route.name),
      })}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="Centres" component={CentersScreen} />
      <Tab.Screen name="RendezVous" component={AppointmentScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
