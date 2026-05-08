import { useAuth } from "@/context/AuthContext";
import { getAuthError } from "@/utils/getAuthError";
import { LuckiestGuy_400Regular, useFonts } from '@expo-google-fonts/luckiest-guy';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// Import Ionicons para sa eye icon
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, signUp } = useAuth();

  let [fontsLoaded] = useFonts({
    'FizzBuzzFont': LuckiestGuy_400Regular, //npx expo install expo-font @expo-google-fonts/luckiest-guy
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  
  // State para sa password visibility
  const [secureText, setSecureText] = useState(true);

  const handleSwitch = () => {
    setIsSigningIn(!isSigningIn);
    setErrorMessage("");
  };

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

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#6289e9" style={{ flex: 1 }} />;
  }

  return (
    <ImageBackground
      source={require("../assets/images/android-icon-background(3).jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentWrapper}>
            {/* EMPHASIZED LOGO */}
            <View style={styles.logoContainer}>
              <Image
                source={require("../assets/images/android-icon-foreground.png")}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>

            {/* COMPACT CARD */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                {isSigningIn ? "Log in" : "Sign Up"}
              </Text>

              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter email"
                  placeholderTextColor="#bbb"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[styles.input, { flex: 1, borderBottomWidth: 0 }]}
                    placeholder="Enter password"
                    placeholderTextColor="#bbb"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={secureText}
                  />
                  <TouchableOpacity 
                    onPress={() => setSecureText(!secureText)}
                    style={styles.eyeButton}
                  >
                    <Ionicons 
                      name={secureText ? "eye-off-outline" : "eye-outline"} 
                      size={20} 
                      color="#6289e9" 
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.gridLine} />
              </View>

              {errorMessage !== "" && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{errorMessage}</Text>
                </View>
              )}

              {isButtonLoading ? (
                <ActivityIndicator size="large" color="#6289e9" style={{ marginVertical: 10 }} />
              ) : (
                <View style={styles.buttonWrapper}>
                  <TouchableOpacity
                    style={styles.mainButton}
                    onPress={isSigningIn ? handleLogin : handleSignUp}
                  >
                    <Text style={styles.mainButtonText}>
                      {isSigningIn ? "LOG IN" : "SIGN UP"}
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>
                      {isSigningIn ? "New user? " : "Joined already? "}
                    </Text>
                    <Pressable onPress={handleSwitch}>
                      <Text style={styles.switchText}>
                        {isSigningIn ? "Sign Up" : "Login"}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 20,
  },
  contentWrapper: {
    alignItems: "center",
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
   
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  logoImage: {
    width: 220, 
    height: 120,
  },
  card: {
    backgroundColor: "rgba(242, 242, 242, 0.98)",
    borderRadius: 25,
    paddingHorizontal: 22,
    paddingTop: 25,
    paddingBottom: 20,
    width: "100%",
    maxWidth: 290, 
    borderColor: "rgba(255, 255, 255, 0.8)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontFamily: 'FizzBuzzFont',
    fontSize: 32,
    textAlign: "center",
    color: "#000",
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  inputWrapper: {
    marginBottom: 12,
  },
  label: {
    fontSize: 11,
    color: "#666",
    marginBottom: 2,
    fontWeight: "700",
  },
  input: {
    borderBottomWidth: 1.5,
    borderBottomColor: "#ccc",
    paddingVertical: 4,
    fontSize: 14,
    color: "#000",
  },
  
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gridLine: {
    height: 1.5,
    backgroundColor: "#ccc",
    width: '100%',
    marginTop: -1,
  },
  eyeButton: {
    paddingHorizontal: 5,
  },
  buttonWrapper: {
    marginTop: 8,
  },
  mainButton: {
    backgroundColor: "#306afe",
    padding: 12,
    borderRadius: 18,
    alignItems: "center",
  },
  mainButtonText: {
    fontFamily: 'FizzBuzzFont',
    color: "white",
    fontSize: 16,
    letterSpacing: 1,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  switchLabel: {
    color: "#999",
    fontSize: 10,
  },
  switchText: {
    color: "#306afe",
    fontWeight: "bold",
    fontSize: 10,
    marginLeft: 4,
  },
  errorContainer: {
    backgroundColor: "#ffebee",
    padding: 6,
    borderRadius: 6,
    marginBottom: 8,
  },
  errorText: {
    color: "#d32f2f",
    fontSize: 10,
    textAlign: "center",
  },
});
