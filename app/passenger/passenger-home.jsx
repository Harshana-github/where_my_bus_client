import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRouter } from "expo-router";
import UserHeader from "../../components/UserHeader";

const { width, height } = Dimensions.get("window");

const PassengerHomeScreen = () => {
  const router = useRouter();

  const buses = [
    { id: "A", latitude: 6.927079, longitude: 79.861244 }, // Colombo
    { id: "B", latitude: 6.933974, longitude: 79.850812 }, // Near Colombo Fort
    { id: "C", latitude: 6.91561, longitude: 79.863602 }, // Near Wellawatte
    { id: "G", latitude: 6.914481, longitude: 79.972733 }, // Near Malabe
  ];
  return (
    <View style={styles.container}>
      <UserHeader />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 6.927079, // Colombo center
          longitude: 79.861244,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {buses.map((bus) => (
          <Marker
            key={bus.id}
            coordinate={{ latitude: bus.latitude, longitude: bus.longitude }}
            title={`Bus ${bus.id}`}
          >
            <View style={styles.busMarker}>
              <Text style={styles.markerText}>{bus.id}</Text>
            </View>
          </Marker>
        ))}
      </MapView>

      <TouchableOpacity
        style={styles.letsGoButton}
        onPress={() => router.push("/passenger/station-filter")}
      >
        <Text style={styles.letsGoText}>Let’s Go</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  busMarker: {
    backgroundColor: "#042D6C",
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
  },
  markerText: {
    color: "white",
    fontWeight: "bold",
  },
  letsGoButton: {
    position: "absolute",
    bottom: 40,
    backgroundColor: "#042D6C",
    width: "80%",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
  },
  letsGoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PassengerHomeScreen;
