/* eslint-disable react-native/no-inline-styles */
import { Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import React, { useRef } from 'react';
import MapView, {
  Marker,
  // Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

export default function Maplayer({ userLocation, points, closest }) {
  const mapRef = useRef(null);

  const zoomOnUser = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: userLocation.lat,
          longitude: userLocation.lon,
          latitudeDelta: 0.03, // ≈ zoom 16
          longitudeDelta: 0.03,
        },
        1000,
      );
    }
  };
  return (
    <>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: userLocation?.lat || -18.9,
          longitude: userLocation?.lon || 47.5,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
        mapType="satellite"
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        onMapReady={zoomOnUser}
      >
        {/* Marker position utilisateur */}
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.lat,
              longitude: userLocation.lon,
            }}
            title="Moi"
            pinColor="blue"
          />
        )}

        {/* Markers centres */}
        {points.map(p => (
          <Marker
            key={p.id}
            coordinate={{ latitude: p.lat, longitude: p.lon }}
            title={p.name}
            description={p.type}
            pinColor={closest?.id === p.id ? 'red' : 'green'}
            // onPress={() => setSelected(p)}
          />
        ))}

        {/* {userLocation && selected && (
          <Polyline
            coordinates={[
              { latitude: userLocation.lat, longitude: userLocation.lon },
              { latitude: selected.lat, longitude: selected.lon },
            ]}
            strokeColor="#fdfdfd"
            strokeWidth={4}
          />
        )} */}
      </MapView>
      <TouchableOpacity style={styles.fab} onPress={zoomOnUser}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>🎯</Text>
      </TouchableOpacity>
    </>
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
