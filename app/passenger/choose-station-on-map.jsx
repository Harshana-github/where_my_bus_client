import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const ChooseStationOnMap = () => {
  const router = useRouter();

  const station = { latitude: 6.927079, longitude: 79.861244 }; // Colombo Fort Station

  const buses = [
    { id: "11", latitude: 6.93055, longitude: 79.847778 }, // Near Galle Face
    { id: "18", latitude: 6.91561, longitude: 79.863602 }, // Wellawatte
    { id: "20", latitude: 6.865, longitude: 79.899722 }, // Moratuwa
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: station.latitude,
          longitude: station.longitude,
          latitudeDelta: 0.05, // Zoom out a bit more to fit buses and station
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={station} title="Your Station">
          <Ionicons name="location-sharp" size={32} color="blue" />
        </Marker>

        {buses.map((bus) => (
          <Marker
            key={bus.id}
            coordinate={{ latitude: bus.latitude, longitude: bus.longitude }}
            title={`Bus ${bus.id}`}
          >
            <View
              style={[
                styles.busMarker,
                { backgroundColor: bus.id === "11" ? "#042D6C" : "#E84C4F" },
              ]}
            >
              <Text style={styles.markerText}>{bus.id}</Text>
            </View>
          </Marker>
        ))}

        {buses.map((bus) => (
          <Polyline
            key={bus.id}
            coordinates={[
              station,
              { latitude: bus.latitude, longitude: bus.longitude },
            ]}
            strokeColor="blue"
            strokeWidth={2}
            lineDashPattern={[4, 4]}
          />
        ))}
      </MapView>

      <View style={styles.displayedBus}>
        <Text style={styles.displayedBusText}>Displayed Bus A</Text>
      </View>

      <View style={styles.bottomPanel}>
        <Text style={styles.confirmText}>Confirm your station?</Text>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => router.push("/passenger/station-filter")}
        >
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chooseAnotherButton}>
          <Text style={styles.chooseAnotherText}>Choose another station</Text>
        </TouchableOpacity>
      </View>
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
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
  },
  markerText: {
    color: "white",
    fontWeight: "bold",
  },
  displayedBus: {
    position: "absolute",
    bottom: 140,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 10,
  },
  displayedBusText: {
    color: "black",
    fontSize: 14,
  },
  bottomPanel: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  confirmText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: "#042D6C",
    width: "90%",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  chooseAnotherButton: {
    backgroundColor: "#EAEAEA",
    width: "90%",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  chooseAnotherText: {
    color: "#042D6C",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ChooseStationOnMap;
