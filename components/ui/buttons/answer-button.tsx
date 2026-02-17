import answerBtn from "@/assets/buttons/answerBtn.png";
import React from "react";
import { ImageBackground, Pressable, StyleSheet, Text } from "react-native";

type AnswerBtnProps = {
  text: string;
  style: any;
  onPress: () => void;
};

const AnswerButton = ({ text, style, onPress }: AnswerBtnProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.imageContainer,
        pressed && styles.pressedEffect,
      ]}
    >
      <ImageBackground
        source={answerBtn}
        style={styles.imgBg}
        resizeMode="stretch"
      >
        <Text style={[styles.btnText, style]}>{text}</Text>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: "47%",
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  btnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  imgBg: {
    width: "100%",
    paddingVertical: 25,
  },

  pressedEffect: {
    transform: [{ scale: 0.96 }],
    opacity: 0.9,
  },
});

export default AnswerButton;
