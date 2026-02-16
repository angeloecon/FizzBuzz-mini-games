import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type AnswerBtnProps = {
  text: string;
  style: any;
  onPress: () => void;
};

const AnswerButton = ({ text, style, onPress }: AnswerBtnProps) => {
  return (
    <TouchableOpacity style={[styles.btn, style]} onPress={onPress}>
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: "47%",
    padding: 25,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  btnText: { color: "white", fontSize: 18, fontWeight: "bold" },
});

export default AnswerButton;
