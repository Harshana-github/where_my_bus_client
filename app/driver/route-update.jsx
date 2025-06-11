import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import UserHeader from "../../components/UserHeader";
import { setRoute } from "../../redux/tempData/tempDataSlice";

const { width } = Dimensions.get("window");

const RouteUpdate = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const route = useSelector((state) => state.tempData.route);

  const [routeName, setRouteName] = useState(route?.route_name || "");
  const [startLocation, setStartLocation] = useState(route?.start_location || "");
  const [endLocation, setEndLocation] = useState(route?.end_location || "");

  const handleSave = () => {
    if (!routeName || !startLocation || !endLocation) {
      alert("Please fill all fields");
      return;
    }

    dispatch(
      setRoute({
        route_name: routeName,
        start_location: startLocation,
        end_location: endLocation,
        is_active: true,
        is_filed: true,
      })
    );

    alert("Route saved locally!");
    router.push("/driver/profile-complete");
  };

  return (
    <View style={styles.container}>
      <UserHeader />
      <View style={styles.whiteBox}>
        <Text style={styles.heading}>Route Information</Text>

        <Text style={styles.label}>Route Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter route name"
          placeholderTextColor="#A0A0A0"
          value={routeName}
          onChangeText={setRouteName}
        />

        <Text style={styles.label}>Start Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter start location"
          placeholderTextColor="#A0A0A0"
          value={startLocation}
          onChangeText={setStartLocation}
        />

        <Text style={styles.label}>End Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter end location"
          placeholderTextColor="#A0A0A0"
          value={endLocation}
          onChangeText={setEndLocation}
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.backButtonRow}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButtonRow} onPress={handleSave}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RouteUpdate;

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
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  backButtonRow: {
    backgroundColor: "#CCCCCC",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 0.48,
    alignItems: "center",
  },
  nextButtonRow: {
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
