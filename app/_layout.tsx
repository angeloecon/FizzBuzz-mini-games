import { AuthProvider } from "@/context/AuthContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* This sets up the navigation for index.tsx and game.tsx */}
        <Stack.Screen name="index" />
        <Stack.Screen name="game" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="scoreBoard" />
      </Stack>
    </AuthProvider>
  );
}
