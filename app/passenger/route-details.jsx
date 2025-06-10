import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const RouteDetails = () => {
  const router = useRouter();

  const routeStops = [
    { id: 1, type: "From", location: "Monaragala", icon: "\ud83d\udd17", background: "#FFF9E5" },
    { id: 2, type: "Via", location: "Wellawaya", icon: "\ud83d\udccd", background: "#F0F4FF" },
    { id: 3, type: "To", location: "Thanamalvila", icon: "\ud83d\udccd", background: "#F0F4FF" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bus Route Details</Text>
      {routeStops.map((stop, index) => (
        <View key={stop.id} style={[styles.routeItem, { backgroundColor: stop.background }]}> 
          <Text style={styles.icon}>{stop.icon}</Text>
          <View style={styles.textContainer}>
            <Text style={styles.routeType}>{stop.type}</Text>
            <Text style={styles.location}>{stop.location}</Text>
          </View>
          <View style={styles.badgeContainer}>
            <Text style={styles.badge}>C</Text>
          </View>
        </View>
      ))}
      <View style={styles.confirmContainer}>
        <TouchableOpacity style={styles.confirmButton} onPress={() => router.push("/passenger/waiting-for-bus")}>
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  routeItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  routeType: {
    fontSize: 14,
    color: "gray",
  },
  location: {
    fontSize: 16,
    fontWeight: "bold",
  },
  badgeContainer: {
    backgroundColor: "#D1D5DB",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  badge: {
    fontWeight: "bold",
    color: "white",
  },
  confirmContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "#042D6C",
    padding: 15,
    borderRadius: 10,
    width: width * 0.9,
    alignItems: "center",
    alignSelf: "center",
    width: "80%",
  },
  confirmText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RouteDetails;