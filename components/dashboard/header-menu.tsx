import menuBtn from "@/assets/buttons/hamburger_menu.png";
import leaderBoard from "@/assets/buttons/leaderBoard.png";
import volumeOn from "@/assets/buttons/volume.png";
import volumeOff from "@/assets/buttons/volumeOff.png";
import React from "react";
import { Alert, ImageBackground, Pressable, StyleSheet, View } from "react-native";
import { useMusic } from "../../app/_layout";


type HeaderProps = {
  onSignOut: () => void;
  onDeleteAccount: () => void;
  onGoToScoreboard: () => void;
};


const HeaderMenu = ({ onSignOut, onDeleteAccount, onGoToScoreboard }: HeaderProps) => {
 
  const { isMuted, toggleMute } = useMusic();


  const handlePressMenu = () => {
    Alert.alert("Menu", "What do you want to do?", [
      { text: "Logout", onPress: onSignOut },
      { text: "Delete Account", style: "destructive", onPress: confirmDelete },
      { text: "Cancel", style: "cancel" },
    ]);
  };


  const confirmDelete = () => {
    Alert.alert(
      "Are you sure?",
      "All your data will be permanently deleted. This action cannot be undone.",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", style: "destructive", onPress: onDeleteAccount },
      ]
    );
  };


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


      {/* Volume Toggle Button +======+======+======+======+ */}
      <Pressable
  onPress={() => {
    console.log("Volume Button Pressed!");
    toggleMute();
  }}
  style={({ pressed }) => [pressed && styles.pressedEffect]}
>
  <ImageBackground
  source={isMuted ? volumeOff : volumeOn}
  resizeMode="stretch"
  style={styles.volumeImage}
/>
</Pressable>


      <Pressable
        onPress={handlePressMenu}
        style={({ pressed }) => [
          styles.imageContainer,
          pressed && styles.pressedEffect,
        ]}
      >
        <ImageBackground
          source={menuBtn}
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
    position: "relative",
  },
  pressedEffect: { transform: [{ scale: 0.96 }], opacity: 0.9 },
  imageContainer: { height: 60, width: 60, marginBottom: 10 },
  image: { flex: 1, justifyContent: "center", alignItems: "center" },
 
  volumeImage: {
    height: 50,
    width: 50,
  },
});


export default HeaderMenu;