import { View, Text, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Authentication() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Authentication</Text>

      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}
