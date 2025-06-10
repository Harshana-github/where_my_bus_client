import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const Thank = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.thankYouText}>Thank you for using this app</Text>
      <TouchableOpacity style={styles.homeButton} onPress={() => router.push("/")}> 
        <FontAwesome name="home" size={18} color="white" style={styles.icon} />
        <Text style={styles.homeButtonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  thankYouText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  homeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#042D6C",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    justifyContent: "center",
  },
  homeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  icon: {
    color: "white",
  },
});

export default Thank;
