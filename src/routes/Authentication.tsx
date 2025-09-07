import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './Navigation';

type AuthScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Authentication'>;

export default function Authentication() {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  return (
    <View>
      <Text>Authentication</Text>
      <Text>Authentication</Text>
      <Button title='Go to Home' onPress={() => navigation.navigate("Home")} />
    </View>
  )
}