/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  View,
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';
import centres from '../../assets/export.json';
import Maplibre from '../../component/Maplibre';
import Maplayer from '../../component/Maplayer';

// Fonction distance Haversine
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export default function CentersScreen() {
  const [loading, setLoading] = useState(false);
  const [points, setPoints] = useState([]);
  const [filter, setFilter] = useState('hospital');
  const [userLocation, setUserLocation] = useState(null);
  const [closest, setClosest] = useState(null);

  // const [selected, setSelected] = useState(null);
  const [mapType, setMapType] = useState('Maplibre');

  // Récupère localisation utilisateur
  useEffect(() => {
    Geolocation.requestAuthorization('whenInUse').then(() => {
      Geolocation.getCurrentPosition(
        pos =>
          setUserLocation({
            // lat: pos.coords.latitude,
            // lon: pos.coords.longitude,
            lat: -18.868578, //exemple
            lon: 47.528403, //exemple
          }),
        err => {
          Alert.alert('Erreur', "Impossible d'obtenir la localisation");
          console.error('Geolocation error:', err);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    });
  }, []);

  // Charge et filtre les données locales
  useEffect(() => {
    setLoading(true);
    try {
      const items = centres.features
        .map(f => ({
          id: f.id,
          name: f.properties?.name || 'Centre de santé',
          type: f.properties?.amenity,
          lat: f.geometry?.coordinates[1],
          lon: f.geometry?.coordinates[0],
        }))
        .filter(p => p.lat && p.lon && p.type === filter);

      setPoints(items);

      // Calcul du plus proche
      if (userLocation && items.length > 0) {
        let nearest = null;
        let minDist = Infinity;
        for (const p of items) {
          const d = getDistance(
            userLocation.lat,
            userLocation.lon,
            p.lat,
            p.lon,
          );
          if (d < minDist) {
            minDist = d;
            nearest = p;
          }
        }
        setClosest(nearest);
      }
    } catch (e) {
      Alert.alert('Erreur', 'Impossible de charger le fichier local GeoJSON');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [filter, userLocation]);

  // function toggleMapType() {
  //   setMapType(prevType => (prevType === 'Maplibre' ? 'Google' : 'Maplibre'));
  // }

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.buttons}>
        {['hospital', 'clinic', 'doctors', 'pharmacy'].map(t => (
          <Button
            key={t}
            title={t}
            onPress={() => setFilter(t)}
            color={filter === t ? '#2E7D32' : '#777'}
          />
        ))}
      </View>

      {/* Carte */}
      {mapType === 'Maplibre' ? (
        <Maplibre filter={filter} />
      ) : (
        <Maplayer
          userLocation={userLocation}
          points={points}
          closest={closest}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 8,
    elevation: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#2E7D32',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});
