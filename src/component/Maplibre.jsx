/* eslint-disable react-native/no-inline-styles */
// /* eslint-disable react-native/no-inline-styles */

import React, { useEffect, useState } from 'react';
import {
  View,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import centres from '../assets/export.json';
import {
  Camera,
  MapView,
  PointAnnotation,
} from '@maplibre/maplibre-react-native';

// Ta clé MapTiler
const MAPTILER_KEY = 'mnKvnQDEpckmdqBjRYBF';
// const MAP_STYLE = `https://api.maptiler.com/maps/satellite/style.json?key=${MAPTILER_KEY}`;
const MAP_STYLE = `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_KEY}`;

// Fonction distance Haversine
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export default function Maplibre({ filter }) {
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [points, setPoints] = useState([]);
  const [closest, setClosest] = useState(null);
  const [selected, setSelected] = useState(null); // Centre cliqué

  // Localisation utilisateur
  useEffect(() => {
    Geolocation.requestAuthorization('whenInUse').then(() => {
      Geolocation.getCurrentPosition(
        pos =>
          setUserLocation({
            lat: -18.868578, // exemple
            lon: 47.528403, // exemple
          }),
        err => {
          Alert.alert('Erreur', "Impossible d'obtenir la localisation");
          console.error(err);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    });
  }, []);

  // Filtrage centres depuis GeoJSON
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

      // Calcul plus proche
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
      console.error(e);
      Alert.alert('Erreur', 'Problème avec le fichier GeoJSON');
    } finally {
      setLoading(false);
    }
  }, [filter, userLocation]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Popup quand un centre est cliqué */}
      {selected && (
        <View style={styles.popup}>
          <Text style={styles.popupTitle}>{selected.name}</Text>
          <Text style={styles.popupType}>{selected.type}</Text>
        </View>
      )}
      <MapView style={styles.map} mapStyle={MAP_STYLE}>
        <Camera
          zoomLevel={userLocation ? 13 : 6}
          centerCoordinate={
            userLocation ? [userLocation.lon, userLocation.lat] : [47.5, -18.9]
          }
        />

        {/* Position utilisateur */}
        {userLocation && (
          <PointAnnotation
            id="user"
            coordinate={[userLocation.lon, userLocation.lat]}
          >
            <View style={styles.userMarker} />
          </PointAnnotation>
        )}

        {/* Centres filtrés */}
        {points.map(p => (
          <PointAnnotation
            key={p.id}
            id={p.id.toString()}
            coordinate={[p.lon, p.lat]}
            onSelected={() => setSelected(p)} // Quand on clique
          >
            <View
              style={[
                styles.centerMarker,
                {
                  backgroundColor: closest?.id === p.id ? 'red' : 'green',
                },
              ]}
            />
          </PointAnnotation>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  userMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'blue',
    borderWidth: 2,
    borderColor: 'white',
  },
  centerMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  popup: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 20 : 40,
    // bottom: 30,
    left: 20,
    right: 20,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
    zIndex: 10,
  },
  popupTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  popupType: {
    fontSize: 14,
    color: '#555',
  },
});
