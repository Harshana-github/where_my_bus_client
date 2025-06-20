import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, ActivityIndicator, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Index = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Wait for 10 seconds
        await new Promise((resolve) => setTimeout(resolve, 10000));

        const userData = await AsyncStorage.getItem("WhereMyBus");
        if (userData) {
          const parsed = JSON.parse(userData);
          const userType = parsed.user.user_type;
          const isProfileCompleted = parsed.user.is_profile_completed;
          if (userType === "passenger") {
            router.replace("/passenger/passenger-home");
          } else if (userType === "driver") {
            if (isProfileCompleted === 1) {
              router.replace("/driver/passenger-location");
            } else {
              router.push("/driver/profile-update");
            }
          } else if (userType === "admin") {
            AsyncStorage.removeItem("WhereMyBus");
            router.replace("/user/login");
          }
        } else {
          router.replace("/user/login");
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        router.replace("/user/login");
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/ellips1.png")}
        style={styles.ellips1}
      />
      <Image
        source={require("../assets/images/ellips2.png")}
        style={styles.ellips2}
      />
      <Image
        source={require("../assets/images/ellips3.png")}
        style={styles.ellips3}
      />
      <Image
        source={require("../assets/images/logo_with_text.png")}
        style={styles.logo}
      />

      <ActivityIndicator size="large" color="#fff" style={styles.loader} />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#042D6C",
  },
  ellips1: {
    position: "absolute",
    top: 100,
    right: 20,
  },
  ellips2: {
    position: "absolute",
    top: 220,
    width: 500,
    height: 500,
    zIndex: 2,
    right: -40,
  },
  ellips3: {
    position: "absolute",
    width: 500,
    height: 650,
    top: 150,
    zIndex: 1,
    right: -40,
  },
  logo: {
    zIndex: 3,
  },
  loader: {
    marginTop: 20,
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16,
  },
});

export default Index;
