import { useRouter } from "expo-router";
import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";

const { width, height } = Dimensions.get("window");

const ProfileUpdate = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Background Ellipses */}
      <Image
        source={require("../../assets/images/ellips4.png")}
        style={[
          styles.ellips4,
          {
            width: width * 0.85,
            height: height * 0.3,
            left: (width - width * 0.85) / 2,
          },
        ]}
      />
      <Image
        source={require("../../assets/images/ellips3.png")}
        style={[
          styles.ellips3,
          {
            width: width * 0.8,
            height: height * 0.4,
            left: (width - width * 0.8) / 2,
          },
        ]}
      />
      {/* Logo */}
      <Image
        source={require("../../assets/images/logo_with_text.png")}
        style={[
          styles.logo,
          {
            left: (width - width * 0.31) / 2,
          },
        ]}
      />

      {/* White Rectangle (Login Form) */}
      <View style={styles.whiteBox}>
        <Text style={styles.heading}>Please update your profile</Text>

        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={() => router.push("/driver/passenger-location")}>
          <Text style={styles.buttonText}>Let's go</Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 15,
  },
  ellips4: {
    position: "absolute",
    top: height * 0.09,
    zIndex: 2,
  },
  ellips3: {
    position: "absolute",
    top: height * 0.05,
    zIndex: 1,
  },
  logo: {
    position: "absolute",
    top: height * 0.2,
    width: width * 0.31,
    height: height * 0.09,
    zIndex: 3,
  },
  whiteBox: {
    width: width * 0.85,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    position: "absolute",
    top: height * 0.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 2,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    backgroundColor: "#F5F5F5",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 15,
    color: "#000",
  },
  button: {
    width: "100%",
    backgroundColor: "#042D6C",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPassword: {
    color: "#042D6C",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
  },
  signUpContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  signUpLink: {
    color: "#042D6C",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default ProfileUpdate;
