import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";

const { width, height } = Dimensions.get("window");

const PassengerSignup = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.whiteBox}>
        <Text style={styles.heading}>Passenger Registration</Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput placeholder="Full Name" placeholderTextColor="#A0A0A0" style={styles.input} />

        <Text style={styles.label}>Email</Text>
        <TextInput placeholder="Email" placeholderTextColor="#A0A0A0" style={styles.input} />

        <Text style={styles.label}>Password</Text>
        <TextInput placeholder="Password" placeholderTextColor="#A0A0A0" secureTextEntry style={styles.input} />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput placeholder="Confirm Password" placeholderTextColor="#A0A0A0" secureTextEntry style={styles.input} />

        <TouchableOpacity style={styles.button} onPress={() => router.push("/passenger/passenger-home")}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/user/login")} style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Centers vertically
    alignItems: "center", // Centers horizontally
    backgroundColor: "#042D6C",
  },
  whiteBox: {
    width: width * 0.85,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5,
    zIndex: 4
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
  loginContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  loginText: {
    color: "#000",
    fontSize: 14,
  },
  loginLink: {
    color: "#042D6C",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default PassengerSignup;
