import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur E-tsabo 🌿</Text>
      <Text style={styles.subtitle}>Votre santé, entre vos mains</Text>
      <Ionicons name="home" size={100} color="#2E7D32" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2E7D32' },
  subtitle: { fontSize: 16, color: '#555', marginTop: 10 },
});
