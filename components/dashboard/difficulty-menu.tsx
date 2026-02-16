import { DifficultyButtons } from "@/components/ui/buttons";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

type props = {
  onSelect: (difficulty: string) => void;
};

type DifficultyMenuItem = {
  title: string;
  color: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  key: string;
};

const DifficultyMenuList: DifficultyMenuItem[] = [
  { title: "Easy", color: "#4CD964", icon: "bicycle", key: "easy" },
  { title: "Normal", color: "#007AFF", icon: "car-sport", key: "normal" },
  { title: "Hard", color: "#FF9500", icon: "airplane", key: "hard" },
  { title: "Expert", color: "#FF3B30", icon: "rocket", key: "expert" },
];

const DifficultyMenu = ({ onSelect }: props) => {
  return (
    <View style={styles.buttonList}>
      {DifficultyMenuList.map((difficulty) => (
        <DifficultyButtons
          key={difficulty.key}
          title={difficulty.title}
          color={difficulty.color}
          icon={difficulty.icon}
          onPress={() => onSelect(difficulty.key)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonList: {
    gap: 15,
  },
});

export default DifficultyMenu;
