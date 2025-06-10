import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const UserHeader = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("WhereMyBus");
        if (userData) {
          const parsed = JSON.parse(userData);
          setUserName(parsed.user.name);
        }
      } catch (err) {
        console.error("Failed to load user:", err);
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("WhereMyBus");
    router.replace("/user/login");
  };

  return (
    <View style={styles.header}>
      <Text style={styles.username}>Hi, {userName}</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.logout}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 40,
    zIndex: 2,
    width: width,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "rgba(4, 45, 108, 0.8)",
    paddingVertical: 10,
  },
  username: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logout: {
    color: "#ffcccc",
    fontSize: 14,
  },
});

export default UserHeader;
