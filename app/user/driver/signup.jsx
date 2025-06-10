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
import { register } from "../../../redux/auth/authThunk";

const { width, height } = Dimensions.get("window");

const DriverSignup = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.userType.userType);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleRegister = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !password || !passwordConfirmation) {
      alert("All fields are required.");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (password !== passwordConfirmation) {
      alert("Passwords do not match.");
      return;
    }

    dispatch(
      register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        user_type: userType,
      })
    )
      .unwrap()
      .then(() => {
        alert("Registration successful! 🎉");
        if (userType === "driver") {
          router.replace("/driver/profile-update");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.whiteBox}>
        <Text style={styles.heading}>Driver Registration</Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#A0A0A0"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#A0A0A0"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Password"
          placeholderTextColor="#A0A0A0"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#A0A0A0"
          secureTextEntry
          style={styles.input}
          value={passwordConfirmation}
          onChangeText={setPasswordConfirmation}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/user/login")}
          style={styles.loginContainer}
        >
          <Text style={styles.loginText}>Already have an account? </Text>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
        {loading && (
          <Text style={{ color: "#666", marginTop: 10 }}>Registering...</Text>
        )}
        {error && <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>}
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

export default DriverSignup;
