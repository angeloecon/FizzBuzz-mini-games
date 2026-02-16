import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type HeaderProps = {
  onSignOut: () => void;
  onGoToScoreboard: () => void;
};

const HeaderMenu = ({ onSignOut, onGoToScoreboard }: HeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onSignOut} style={styles.navButton}>
        <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onGoToScoreboard} style={styles.navButton}>
        <Text style={styles.scoreText}>Scoreboard</Text>
        <Ionicons name="trophy-outline" size={24} color="#FFD700" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  signOutText: { color: "#FF3B30", fontWeight: "600", marginLeft: 4 },
  scoreText: { color: "#333", fontWeight: "600", marginRight: 4 },
});

export default HeaderMenu;
