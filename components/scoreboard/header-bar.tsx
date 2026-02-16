import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type HeaderBarProps = {
  onGoBack: () => void;
};

const HeaderBar = ({ onGoBack }: HeaderBarProps) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => onGoBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#007AFF" />
      </TouchableOpacity>
      <Text style={styles.title}>Leaderboard</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
  },
  backButton: { marginRight: 15 },
  title: { fontSize: 24, fontWeight: "bold" },
});

export default HeaderBar;
