import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { useState } from "react";
import UserHeader from "../../components/UserHeader";
import { setDriver } from "../../redux/tempData/tempDataSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const DetailsUpdate = () => {
  const dispatch = useDispatch();
  const driver = useSelector((state) => state.tempData.driver);
  
  const router = useRouter();

  const [licenseNumber, setLicenseNumber] = useState(
    driver?.license_number || ""
  );
  const [phone, setPhone] = useState(driver?.phone || "");
  const [profileImage, setProfileImage] = useState(driver?.profile_image || "");

  const handleSave = async () => {
    if (!licenseNumber || !phone) {
      alert("License number and phone are required.");
      return;
    }

    try {
      const stored = await AsyncStorage.getItem("WhereMyBus");
      const parsed = stored ? JSON.parse(stored) : null;
      const user_id = parsed?.user?.id;

      if (!user_id) {
        alert("User ID not found. Please login again.");
        return;
      }

      dispatch(
        setDriver({
          user_id,
          license_number: licenseNumber,
          phone,
          profile_image: profileImage || null,
          is_active: true,
          is_filed: true,
        })
      );

      alert("Driver details saved locally!");
      router.push("/driver/bus-update");
    } catch (error) {
      console.error("Error fetching user_id from AsyncStorage:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  return (
    <View style={styles.container}>
      <UserHeader />
      <View style={styles.whiteBox}>
        <Text style={styles.heading}>Driver Profile</Text>

        <Text style={styles.label}>License Number</Text>
        <TextInput
          placeholder="License Number"
          placeholderTextColor="#A0A0A0"
          style={styles.input}
          value={licenseNumber}
          onChangeText={setLicenseNumber}
        />

        <Text style={styles.label}>Phone</Text>
        <TextInput
          placeholder="Phone"
          placeholderTextColor="#A0A0A0"
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Next</Text>
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
    backgroundColor: "#042D6C",
  },
  whiteBox: {
    width: width * 0.85,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5,
    zIndex: 4,
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
});

export default DetailsUpdate;
