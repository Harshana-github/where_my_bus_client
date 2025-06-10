import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const ChooseBus = () => {
  const router = useRouter();
  const [selectedBus, setSelectedBus] = useState(null);

  const buses = [
    { id: "AAH-8190", arrival: "5 min" },
    { id: "BDE-8234", arrival: "20 min" },
    { id: "BUS-8322", arrival: "20 min" },
    { id: "GGE-8322", arrival: "20 min" },
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 6.927079, // Colombo
          longitude: 79.861244,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {buses.map((bus, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: 6.927079 + index * 0.01,
              longitude: 79.861244 + index * 0.01,
            }}
            title={bus.id}
          >
            <View style={styles.busMarker}>
              <Text style={styles.markerText}>{bus.id.charAt(0)}</Text>
            </View>
          </Marker>
        ))}
      </MapView>

      <View style={styles.selectionContainer}>
        <Text style={styles.selectTitle}>Select bus</Text>
        <FlatList
          data={buses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.busItem,
                selectedBus === item.id && styles.selectedBus,
              ]}
              onPress={() => setSelectedBus(item.id)}
            >
              <View style={styles.busInfo}>
                <Image
                  source={require("../../assets/images/bus-icon.png")}
                  style={styles.busIcon}
                />
                <View>
                  <Text style={styles.busText}>{item.id}</Text>
                  <Text style={styles.arrivalText}>
                    Estimated arrived in{" "}
                    <Text style={styles.arrivalTime}>{item.arrival}</Text>
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => router.push("/passenger/route-details")}
        >
          <Text style={styles.selectButtonText}>Select</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  map: {
    width: "100%",
    height: "50%",
  },
  busMarker: {
    backgroundColor: "#042D6C",
    padding: 6,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "white",
  },
  markerText: {
    color: "white",
    fontWeight: "bold",
  },
  selectionContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  selectTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  busItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedBus: {
    backgroundColor: "#FFD700",
  },
  busInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  busIcon: {
    width: 30,
    height: 20,
    marginRight: 10,
  },
  busText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  arrivalText: {
    fontSize: 14,
    color: "gray",
  },
  arrivalTime: {
    color: "#1A73E8",
    fontWeight: "bold",
  },
  selectButton: {
    backgroundColor: "#042D6C",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    alignSelf: "center",
    width: "80%",
  },
  selectButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ChooseBus;
