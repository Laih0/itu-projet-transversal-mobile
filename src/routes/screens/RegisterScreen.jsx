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

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !phone || !password) {
      Alert.alert('Erreur', 'Tous les champs sont obligatoires');
      return;
    }

    setLoading(true);
    const res = await api.register(name, phone, password);
    setLoading(false);

    if (res.success) {
      Alert.alert('Succès', 'Compte créé avec succès ! Connectez-vous.');
      navigation.replace('Login');
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
      <Text style={styles.title}>Inscription</Text>

      {/* Champs */}
      <TextInput
        placeholder="Nom complet"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
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
          title={loading ? 'Création...' : 'Créer un compte'}
          onPress={handleRegister}
          color="#ffffff"
        />
      </View>

      {/* Lien vers login */}
      <Text style={styles.link} onPress={() => navigation.replace('Login')}>
        Déjà inscrit ? Se connecter
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
    width: 160,
    height: 160,
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
    width: '100%',
    borderWidth: 1,
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  buttonWrapper: {
    width: '175',
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
