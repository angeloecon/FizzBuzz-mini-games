import difficultyBtn from "@/assets/buttons/difficultyBtn.png";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ImageBackground, Pressable, StyleSheet, Text } from "react-native";

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
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.imageContainer,
        pressed && styles.pressedEffect,
      ]}
    >
      <ImageBackground
        source={difficultyBtn}
        resizeMode="stretch"
        style={[styles.difficultyButton]}
      >
        <Ionicons
          name={icon}
          size={24}
          style={[
            { marginRight: 10, borderColor: "white", borderStyle: "solid" },
            { color: color },
          ]}
        />
        <Text style={styles.btnText}>{title}</Text>
      </ImageBackground>
    </Pressable>
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

  imageContainer: {
    height: 60,
    width: "100%",
    marginBottom: 10,
  },

  pressedEffect: {
    transform: [{ scale: 0.96 }],
    opacity: 0.9,
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
