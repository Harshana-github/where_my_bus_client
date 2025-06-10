import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import UserHeader from "../../components/UserHeader";

const { width, height } = Dimensions.get("window");

const PassengerLocation = () => {
  const router = useRouter();

  const passengerMarkers = [
    { id: "1", latitude: 6.9271, longitude: 79.8612 },
    { id: "2", latitude: 6.9301, longitude: 79.8652 },
  ];

  return (
    <View style={styles.container}>
      <UserHeader />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 6.9271, // Example latitude
          longitude: 79.8612, // Example longitude
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {passengerMarkers.map((passenger) => (
          <Marker
            key={passenger.id}
            coordinate={{
              latitude: passenger.latitude,
              longitude: passenger.longitude,
            }}
            title={`Passenger ${passenger.id}`}
          />
        ))}

        <Polyline
          coordinates={[
            { latitude: 6.9271, longitude: 79.8612 },
            { latitude: 6.9301, longitude: 79.8652 },
          ]}
          strokeColor="#042D6C"
          strokeWidth={4}
        />
      </MapView>

      <View style={styles.passengerInfo}>
        <Text style={styles.heading}>Passenger Locations</Text>
      </View>

      <View style={styles.noBusContainer}>
        <Text style={styles.noBusText}>No Bus Displayed</Text>
      </View>

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => router.push("/")}
      >
        <Text style={styles.homeButtonText}>
          <FontAwesome
            name="home"
            size={18}
            color="white"
            style={styles.icon}
          />{" "}
          Home
        </Text>
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
    height: "80%",
  },
  passengerInfo: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
  },
  noBusContainer: {
    position: "absolute",
    top: height * 0.5,
    alignSelf: "center",
    backgroundColor: "#D1D5DB",
    padding: 10,
    borderRadius: 10,
  },
  noBusText: {
    fontSize: 14,
    color: "black",
  },
  homeButton: {
    position: "absolute",
    bottom: 20,
    width: width * 0.9,
    backgroundColor: "#042D6C",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
  },
  homeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PassengerLocation;
