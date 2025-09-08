import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import { api } from '../../services/api';

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const res = await api.login(phone, password);
    setLoading(false);

    if (res.success) {
      Alert.alert('Bienvenue', `Bonjour ${res.patient.name}`);
      navigation.replace('Home'); // va vers HomeTabs
    } else {
      Alert.alert('Erreur', res.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Titre */}
      {/* <Text style={styles.title}>Connexion</Text> */}

      {/* Champs de saisie */}
      <TextInput
        placeholder="Numéro de téléphone"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="Mot de passe"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {/* Bouton */}
      <View style={styles.buttonWrapper}>
        <Button
          title={loading ? 'Connexion...' : 'Se connecter'}
          onPress={handleLogin}
          color="#ffffff"
        />
      </View>

      {/* Lien inscription */}
      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        Pas encore de compte ? S’inscrire
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // centre horizontalement
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2E7D32',
    textAlign: 'center',
  },
  input: {
    width: '100%', // prend toute la largeur dispo
    borderWidth: 1,
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  buttonWrapper: {
    width: 150,
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#2E7D32',
  },
  link: {
    color: '#2E7D32',
    marginTop: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
});
