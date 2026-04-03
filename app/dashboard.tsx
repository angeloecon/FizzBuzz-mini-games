import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  DifficultyMenu,
  HeaderMenu,
  ProfileHeader,
} from "../components/dashboard";

import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleDifficultySelect = (difficulty: string) => {
    console.log(`Selected Difficulty: ${difficulty}`);
    router.replace({
      pathname: "/game",
      params: { difficulty: difficulty },
    });
  };

  const handleSignOut = async () => {
    await signOut();
    router.replace("/");
  };

  const handleGoToScoreboard = () => {
    router.push("/scoreBoard");
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section  +======+======+======+======+======+======+======+ */}
      <HeaderMenu
        onSignOut={handleSignOut}
        onGoToScoreboard={handleGoToScoreboard}
      />

      {/* Profile / Welcome Section  +======+======+======+======+======+======+======+ */}
      <ProfileHeader email={user?.email} />

      {/* Difficulty Selection  +======+======+======+======+======+======+======+__ */}
      <View style={styles.menuContainer}>
        <Text style={styles.sectionTitle}>Select Difficulty</Text>
        <DifficultyMenu onSelect={handleDifficultySelect} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    paddingHorizontal: 20,
  },
  // Profile --------------------------

  menuContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
    marginLeft: 5,
  },
});

export default Dashboard;
