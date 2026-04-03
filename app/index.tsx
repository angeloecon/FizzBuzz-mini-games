import { useAuth } from "@/context/AuthContext";
import { getAuthError } from "@/utils/getAuthError";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, signUp } = useAuth();

  // State declarations  +======+======+======+======+======+======+======+____
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  // function declarations  +======+======+======+======+======+======+======+____

  const handleSwitch = () => {
    setIsSigningIn(!isSigningIn);
  };

  // Function for Login  +======+======+======+======+======+======+======+____
  const handleLogin = async () => {
    setIsButtonLoading(true);
    try {
      await signIn(email, password);
      router.replace("/dashboard");
    } catch (error: any) {
      setErrorMessage(getAuthError(error.code));
    } finally {
      setIsButtonLoading(false);
    }
  };

  // Sign Up Function  +======+======+======+======+======+======+======+____
  const handleSignUp = async () => {
    setIsButtonLoading(true);
    try {
      await signUp(email, password);
      Alert.alert("Success", "Account created! Logging you in...");
      router.replace("/dashboard");
    } catch (error: any) {
      setErrorMessage(getAuthError(error.code));
    } finally {
      setIsButtonLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/android-icon-foreground.png")}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {errorMessage !== "" && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}

      {/* Loading condition for the button: */}
      {isButtonLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {/* Condition for Login/Sign Up button: */}
          {isSigningIn ? (
            <TouchableOpacity
              style={[styles.button, styles.loginBtn]}
              onPress={handleLogin}
            >
              <Text style={[styles.buttonText, styles.loginBtnText]}>
                Login
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.button, styles.signupBtn]}
              onPress={handleSignUp}
            >
              <Text style={[styles.buttonText, styles.signupBtnText]}>
                Create Account
              </Text>
            </TouchableOpacity>
          )}

          {/* Condition for login or sign up */}
          {isSigningIn ? (
            <View style={styles.switchContainer}>
              <Text>Don't have account yet? </Text>

              <Pressable onPress={handleSwitch}>
                <Text style={styles.switchText}>Sign Up</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.switchContainer}>
              <Text>Already have account? </Text>
              <Pressable onPress={handleSwitch}>
                <Text style={styles.switchText}>Login</Text>
              </Pressable>
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#3d7aff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  logoContainer: {
    alignItems: "center",
  },
  logoImage: {
    width: 250,
    height: 250,
  },

  //Buttons
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },

  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },

  loginBtn: {
    backgroundColor: "#1642d3",
  },
  signupBtn: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#1642d3",
  },

  loginBtnText: {
    color: "white",
  },
  signupBtnText: {
    color: "#1642d3",
  },

  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  switchText: {
    color: "#0898f8",
  },

  //Error Styles
  errorContainer: {
    backgroundColor: "#ffebee",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ffcdd2",
  },
  errorText: {
    color: "#d32f2f",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
});

// Font : Bangers, Luckiest Guy
//
