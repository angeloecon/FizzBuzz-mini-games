import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type ProfileHeaderProps = {
  email?: string | null;
};

const ProfileHeader = ({ email }: ProfileHeaderProps) => {
  const username = email ? email.split("@")[0] : "Guest Player";
  return (
    <View style={styles.profileSection}>
      <View style={styles.avatarContainer}>
        <Ionicons name="person-circle" size={80} color="#007AFF" />
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
  welcomeText: { fontSize: 16, color: "#888", marginTop: 10 },
  usernameText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textTransform: "capitalize",
  },
});

export default ProfileHeader;
