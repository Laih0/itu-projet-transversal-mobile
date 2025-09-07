import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AppointmentScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes rendez-vous 📅</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: 'bold', color: "#2E7D32" },
});
