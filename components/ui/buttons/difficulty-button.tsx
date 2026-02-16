import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type DifficultyBtnProps = {
  title: string;
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};

const DifficultyButtons = ({
  title,
  color,
  icon,
  onPress,
}: DifficultyBtnProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.difficultyButton, { backgroundColor: color }]}
    >
      <Ionicons
        name={icon}
        size={24}
        color="white"
        style={{ marginRight: 10 }}
      />
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  difficultyButton: {
    flexDirection: "row",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  btnText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
    lineHeight: 24,
  },
});

export default DifficultyButtons;
