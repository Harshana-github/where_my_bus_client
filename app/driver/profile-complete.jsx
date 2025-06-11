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
import UserHeader from "../../components/UserHeader";
import { useDispatch, useSelector } from "react-redux";
import { submitDriver } from "../../redux/driver/driverThunk";
import { clearTempData } from "../../redux/tempData/tempDataSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const ProfileComplete = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const driverData = useSelector((state) => state.tempData.driver);
  const busData = useSelector((state) => state.tempData.bus);
  const routeData = useSelector((state) => state.tempData.route);
  const handleSubmit = () => {
    if (!driverData) {
      alert("No driver data to submit.");
      return;
    }

    if (!busData) {
      alert("No bus data to submit.");
      return;
    }

    if (!routeData) {
      alert("No route data to submit.");
      return;
    }

    const driverProfileData = {
      driver: driverData,
      bus: busData,
      route: routeData,
    };

    dispatch(submitDriver(driverProfileData))
      .unwrap()
      .then(async () => {
        dispatch(clearTempData());
        // ✅ Update AsyncStorage
        try {
          const stored = await AsyncStorage.getItem("WhereMyBus");
          if (stored) {
            const parsed = JSON.parse(stored);
            const updatedUser = {
              ...parsed.user,
              is_profile_completed: 1,
            };
            await AsyncStorage.setItem(
              "WhereMyBus",
              JSON.stringify({
                ...parsed,
                user: updatedUser,
              })
            );
          }
        } catch (e) {
          console.error("Failed to update user profile status:", e);
        }
        alert("Driver data submitted successfully!");
        router.push("driver/passenger-location");
      })
      .catch((err) => {
        alert("Failed to submit driver data: " + err);
      });
  };

  return (
    <View style={styles.container}>
      <UserHeader />
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
        <Text style={styles.heading}>
          Are you sure save this all details as your profile?
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
            <Text style={styles.nextButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 50,
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
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  backButton: {
    backgroundColor: "#CCCCCC",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 0.48,
    alignItems: "center",
  },
  nextButton: {
    backgroundColor: "#042D6C",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 0.48,
    alignItems: "center",
  },
  backButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  nextButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ProfileComplete;
