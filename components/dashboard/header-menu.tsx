import leaderBoard from "@/assets/buttons/leaderBoard.png";
import logoutBtn from "@/assets/buttons/logout.png";
import React from "react";
import { ImageBackground, Pressable, StyleSheet, View } from "react-native";

type HeaderProps = {
  onSignOut: () => void;
  onGoToScoreboard: () => void;
};

const HeaderMenu = ({ onSignOut, onGoToScoreboard }: HeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <Pressable
        onPress={onGoToScoreboard}
        style={({ pressed }) => [
          styles.imageContainer,
          pressed && styles.pressedEffect,
        ]}
      >
        <ImageBackground
          source={leaderBoard}
          resizeMode="stretch"
          style={styles.image}
        />
      </Pressable>

      <Pressable
        onPress={onSignOut}
        style={({ pressed }) => [
          styles.imageContainer,
          pressed && styles.pressedEffect,
        ]}
      >
        <ImageBackground
          source={logoutBtn}
          resizeMode="stretch"
          style={styles.image}
        />
      </Pressable>
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

  pressedEffect: {
    transform: [{ scale: 0.96 }],
    opacity: 0.9,
  },
  imageContainer: {
    height: 60,
    width: 60,
    marginBottom: 10,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HeaderMenu;
