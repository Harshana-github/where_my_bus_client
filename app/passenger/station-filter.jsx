import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const stations = [
  { id: "1", name: "Thanamalwila", selected: true },
  { id: "2", name: "Thangalle", selected: false },
  { id: "3", name: "Thalawakele", selected: false },
  { id: "4", name: "Trinko", selected: false },
  { id: "5", name: "Thibiriya", selected: false },
];

const StationFilter = () => {
  const router = useRouter();
  const [selectedStation, setSelectedStation] = useState("1");

  const renderStation = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.stationItem,
        item.id === selectedStation
          ? styles.selectedStation
          : styles.unselectedStation,
      ]}
      onPress={() => setSelectedStation(item.id)}
    >
      <Ionicons
        name="location-sharp"
        size={18}
        color={item.id === selectedStation ? "#FFC107" : "#90A4AE"}
      />
      <Text style={styles.stationText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter Your Station</Text>
      <TextInput
        style={styles.input}
        placeholder="Station"
        placeholderTextColor="#B0BEC5"
      />
      <TouchableOpacity style={styles.mapButton} onPress={() => router.push("/passenger/choose-station-on-map")}>
        <Text style={styles.mapButtonText}>CHOOSE ON MAP</Text>
      </TouchableOpacity>

      <Text style={styles.subHeading}>Stations</Text>
      <FlatList
        data={stations}
        renderItem={renderStation}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity style={styles.selectButton} onPress={() => router.push("/passenger/choose-bus")}>
        <Text style={styles.selectButtonText}>Select</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  mapButton: {
    backgroundColor: "#D6D6D6",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  mapButtonText: {
    color: "#555",
    fontWeight: "bold",
  },
  subHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  stationItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedStation: {
    backgroundColor: "#FFE082",
  },
  unselectedStation: {
    backgroundColor: "#F5F5F5",
  },
  stationText: {
    marginLeft: 10,
    fontSize: 16,
  },
  selectButton: {
    backgroundColor: "#042D6C",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    width: "80%",
  },
  selectButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default StationFilter;
