import { useRouter } from "expo-router";
import { useDispatch } from 'react-redux';
import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { setUserType } from "../../redux/userType/userTypeSlice";

const { width, height } = Dimensions.get("window");

const SignupType = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSelect = (type) => {
    dispatch(setUserType(type));
    if (type === "passenger") {
      router.push("/user/passenger/signup");
    } else {
      router.push("/user/driver/signup");
    }
  };
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

      <View style={styles.whiteBox}>
        <Text style={styles.heading}>Who are you ?</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSelect("passenger")}
        >
          <Text style={styles.buttonText}>Passenger</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSelect("driver")}
        >
          <Text style={styles.buttonText}>Driver</Text>
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
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    backgroundColor: "#042D6C",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SignupType;
