import { useRouter } from "expo-router";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  DifficultyMenu,
  HeaderMenu,
  ProfileHeader,
} from "../components/dashboard";

import { auth } from "@/firebase/firebaseConfig";
import { deleteUser } from "firebase/auth";
import { deleteUserFirestoreData } from "../services/scoreServices";

import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleDifficultySelect = (difficulty: string) => {
    router.replace({
      pathname: "/game",
      params: { difficulty: difficulty },
    });
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleGoToScoreboard = () => {
    router.push("/scoreBoard");
  };

  const handleDeleteAccount = async () => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      const uid = currentUser.uid;
      try {
        // delete firestore first
        await deleteUserFirestoreData(uid);
        
        // delete the Auth Account
        await deleteUser(currentUser);

        Alert.alert("Success", "Account and records deleted.");
        router.replace("/");
      } catch (error: any) {
        if (error.code === "auth/requires-recent-login") {
          Alert.alert("Security Check", "Please logout and login again before deleting.");
        } else {
          console.error("Delete error:", error);
          Alert.alert("Error", "Failed to delete account.");
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderMenu
        onSignOut={handleSignOut}
        onGoToScoreboard={handleGoToScoreboard}
        onDeleteAccount={handleDeleteAccount}
      />

      <ProfileHeader email={user?.email} />

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