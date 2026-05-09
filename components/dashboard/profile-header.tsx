import { LuckiestGuy_400Regular, useFonts } from "@expo-google-fonts/luckiest-guy";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type ProfileHeaderProps = {
  email?: string | null;
};

const ProfileHeader = ({ email }: ProfileHeaderProps) => {
  
  const [fontsLoaded] = useFonts({
    'FizzBuzzFont': LuckiestGuy_400Regular,
  });

  const username = email ? email.split("@")[0] : "Guest Player";

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <View style={styles.profileSection}>
      <View style={styles.avatarContainer}>
        <Ionicons name="person-circle" size={90} color="#000000" />
      </View>
      <Text style={styles.welcomeText}>Welcome,</Text>
      <Text style={styles.usernameText}>{username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profileSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  avatarContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 16,
    color: "#0133fe",
    marginTop: 10,
    fontFamily: 'FizzBuzzFont', 
  },
  usernameText: {
    fontSize: 28,
    color: "#011624",
    textTransform: "capitalize",
    fontFamily: 'FizzBuzzFont',
  },
});

export default ProfileHeader;