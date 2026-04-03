import { DifficultyButtons } from "@/components/ui/buttons";
import { DifficultyMenuList } from "@/constant/gameConfig";
import React from "react";
import { View } from "react-native";

type props = {
  onSelect: (difficulty: string) => void;
};

const DifficultyMenu = ({ onSelect }: props) => {
  return (
    <View style={{ gap: 15 }}>
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

export default DifficultyMenu;
