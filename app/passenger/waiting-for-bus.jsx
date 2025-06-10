import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const WaitingForBus = () => {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Simulate bus getting closer to user
    setTimeout(() => setShowPopup(true), 5000);
  }, []);

  const handleYesPress = () => {
    setShowPopup(false);
    router.push("/passenger/thank");
  };

  const handleNoPress = () => {
    setShowPopup(false);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 6.4219,
          longitude: 81.3493,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude: 6.4219, longitude: 81.3493 }}
          title="Bus Stop"
        />
        <Marker
          coordinate={{ latitude: 6.425, longitude: 81.352 }}
          title="Bus Location"
        />
        <Polyline
          coordinates={[
            { latitude: 6.4219, longitude: 81.3493 },
            { latitude: 6.425, longitude: 81.352 },
          ]}
          strokeColor="#042D6C"
          strokeWidth={4}
        />
      </MapView>

      <View style={styles.busDetailsContainer}>
        <Text style={styles.routeText}>Thanamalvila - Wellawaya</Text>
        <Text style={styles.arrivalTime}>
          Estimated arrived in <Text style={styles.highlightedText}>5 min</Text>
        </Text>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>Type</Text>
            <Text style={styles.detailValue}>TATA</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>Driver Name</Text>
            <Text style={styles.detailValue}>Saman Soysa</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>Bus number</Text>
            <Text style={styles.detailValue}>AAH-8190</Text>
          </View>
        </View>
      </View>

      {showPopup && (
        <View style={styles.popupContainer}>
          <View style={styles.popupContent}>
            <Text style={styles.popupTitle}>Are you in?</Text>
            <TouchableOpacity style={styles.yesButton} onPress={handleYesPress}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.noButton} onPress={handleNoPress}>
              <Text style={styles.noButtonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "65%",
  },
  busDetailsContainer: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    elevation: 5,
  },
  routeText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  arrivalTime: {
    fontSize: 16,
    color: "gray",
    marginBottom: 15,
  },
  highlightedText: {
    color: "#1A73E8",
    fontWeight: "bold",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailItem: {
    flex: 1,
  },
  detailTitle: {
    fontSize: 14,
    color: "gray",
  },
  detailValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  popupContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    width: "80%",
    alignItems: "center",
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  yesButton: {
    backgroundColor: "#042D6C",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  noButton: {
    backgroundColor: "#E0E0E0",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  noButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WaitingForBus;
