import { useRouter } from "expo-router";
import React from "react";
import { Alert, ImageBackground, StyleSheet, Text, View } from "react-native";
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
            // 1. Unahon pag-delete ang Firestore data (samtang naa pay auth session)
            await deleteUserFirestoreData(uid);
                  
            // 2. I-delete ang Auth account
            await deleteUser(currentUser);
            
            // 3. I-clear ang local auth state
            await signOut();
            
            Alert.alert("Success", "Account and records deleted permanently.");
            router.replace("/");
         } catch (error: any) {
            // to handle the security requirement in Firebase
            if (error.code === "auth/requires-recent-login") {
               Alert.alert(
                  "Security Check",
                  "For security reasons, you must re-login before you can delete your account. Do you want to log out now?",
                  [
                     { text: "No, thanks", style: "cancel" },
                     {
                        text: "Yes, Logout",
                        onPress: async () => {
                           await signOut();
                           router.replace("/");
                        }
                     }
                  ]
               );
            } else {
               console.error("Delete error:", error);
               Alert.alert("Error", "Failed to delete account. Please try again.");
            }
         }
      }
   };

   return (
      <ImageBackground 
         source={require("@/assets/images/android-icon-background(3).jpg")} 
         style={styles.backgroundImage}
         resizeMode="cover"
      >
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
      </ImageBackground>
   );
};

const styles = StyleSheet.create({
   backgroundImage: {
      flex: 1,
      width: "100%",
      height: "100%",
   },
   container: {
      flex: 1,
      
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