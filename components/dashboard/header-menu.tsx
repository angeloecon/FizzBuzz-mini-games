import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useMusic } from "../../app/_layout";

// Assets
import menuBtn from "@/assets/buttons/hamburger_menu.png";

type HeaderProps = {
  onSignOut: () => void;
  onDeleteAccount: () => void;
  onGoToScoreboard: () => void;
};

const HeaderMenu = ({ onSignOut, onDeleteAccount, onGoToScoreboard }: HeaderProps) => {
  const { isMuted, toggleMute } = useMusic();
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!isMenuVisible);

  const confirmDelete = () => {
    setMenuVisible(false);
    Alert.alert(
      "Are you sure?",
      "This will delete your account and records. You will be logged out.",
      [
        { text: "No", style: "cancel" },
        { 
          text: "Yes", 
          style: "destructive", 
          onPress: async () => {
  await onDeleteAccount(); 
} 
        },
      ]
    );
  };

  const MenuOption = ({ icon, label, onPress, bgColor = "#555", color = "#333" }: any) => (
    <TouchableOpacity style={styles.slideOption} onPress={onPress}>
      <View style={[styles.iconCircle, { backgroundColor: bgColor }]}>
        <Ionicons name={icon} size={22} color="#fff" />
      </View>
      <Text style={[styles.optionText, { color }]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.headerContainer}>
      <View style={styles.spacer} />

      <Pressable
        onPress={toggleMenu}
        style={({ pressed }) => [
          styles.imageContainer,
          pressed && styles.pressedEffect,
        ]}
      >
        <ImageBackground source={menuBtn} resizeMode="stretch" style={styles.image} />
      </Pressable>

      <Modal
        visible={isMenuVisible}
        transparent
        animationType="slide"
        onRequestClose={toggleMenu}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={toggleMenu}
        >
          <View style={styles.slideBar}>
            <View style={styles.indicator} />
            <Text style={styles.slideTitle}>MENU</Text>

            <MenuOption
              icon={isMuted ? "volume-mute" : "volume-high"}
              label={isMuted ? "Unmute" : "Mute"}
              onPress={toggleMute}
            />

            <MenuOption
              icon="trophy"
              label="Leaderboard"
              bgColor="#FFD700"
              onPress={() => {
                toggleMenu();
                onGoToScoreboard();
              }}
            />

            <MenuOption
              icon="log-out"
              label="Logout"
              bgColor="#6289e9"
              onPress={() => {
                toggleMenu();
                onSignOut();
              }}
            />

            <MenuOption
              icon="trash"
              label="Delete Account"
              bgColor="#ff4444"
              color="#ff4444"
              onPress={confirmDelete}
            />

            <TouchableOpacity style={styles.closeBtn} onPress={toggleMenu}>
              <Text style={styles.closeText}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 15,
    paddingLeft: 20,
    paddingRight: 5, 
    width: "100%",
  },
  spacer: { flex: 1 },
  imageContainer: { 
    height: 60, 
    width: 60,
    marginRight: -2,
  },
  image: { flex: 1, justifyContent: "center", alignItems: "center" },
  pressedEffect: { transform: [{ scale: 0.94 }], opacity: 0.9 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },
  slideBar: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 25,
    paddingBottom: Platform.OS === "ios" ? 45 : 30,
    alignItems: "center",
  },
  indicator: {
    width: 45,
    height: 5,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    marginBottom: 20,
  },
  slideTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    letterSpacing: 1,
  },
  slideOption: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
  },
  closeBtn: { marginTop: 20, padding: 10 },
  closeText: {
    color: "#6289e9",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default HeaderMenu;