import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import UserHeader from "../../components/UserHeader";
import { setBus } from "../../redux/tempData/tempDataSlice";

const { width, height } = Dimensions.get("window");

const BusDetails = () => {
  const dispatch = useDispatch();
  const bus = useSelector((state) => state.tempData.bus);

  const router = useRouter();

  const [busNumber, setBusNumber] = useState(bus?.bus_number || "");
  const [registrationId, setRegistrationId] = useState(
    bus?.registration_id || ""
  );
  const [routeId, setRouteId] = useState(bus?.route_id || "");
  const [image01, setImage01] = useState(bus?.image_01 || "");

  const handleSave = () => {
    if (!busNumber || !registrationId || !routeId) {
      alert("Please fill all required fields.");
      return;
    }

    dispatch(
      setBus({
        bus_number: busNumber,
        registration_id: registrationId,
        route_id: routeId,
        image_01: image01 || null,
        is_active: true,
        is_filed: true,
      })
    );

    alert("Bus details saved locally!");
    router.push("/driver/route-update");
  };
  return (
    <View style={styles.container}>
      <UserHeader />

      <View style={styles.whiteBox}>
        <Text style={styles.heading}>Bus Details</Text>

        <Text style={styles.label}>Bus Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter bus number"
          placeholderTextColor="#A0A0A0"
          value={busNumber}
          onChangeText={setBusNumber}
        />

        <Text style={styles.label}>Registration ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter registration ID"
          placeholderTextColor="#A0A0A0"
          value={registrationId}
          onChangeText={setRegistrationId}
        />

        <Text style={styles.label}>Route ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter route ID"
          placeholderTextColor="#A0A0A0"
          keyboardType="numeric"
          value={routeId}
          onChangeText={setRouteId}
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

        {/* <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity> */}
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

export default BusDetails;
