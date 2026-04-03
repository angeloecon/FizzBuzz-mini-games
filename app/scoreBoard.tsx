import { fetchHighScoreList } from "@/services/scoreServices";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBar, TabMenu } from "../components/scoreboard";

import PlayerTab from "@/components/scoreboard/playerTab";

import { Player } from "@/types";

const DIFFICULTIES = ["easy", "normal", "hard", "expert"];

export default function ScoreBoardScreen() {
  const router = useRouter();

  const [leaders, setLeaders] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");

  useEffect(() => {
    fetchLeaderboard();
  }, [selectedDifficulty]);

  const fetchLeaderboard = async () => {
    setLoading(true);

    try {
      const scoreData = await fetchHighScoreList(selectedDifficulty);
      setLeaders(scoreData);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch leaderboard. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header  +======+======+======+======+======+======+======+__ */}
      <HeaderBar onGoBack={handleGoBack} />

      {/* Tabs for Difficulty  +======+======+======+======+======+======+======+__ */}
      <TabMenu
        tabs={DIFFICULTIES}
        activeTab={selectedDifficulty}
        onTabChange={setSelectedDifficulty}
      />

      {/* The List  +======+======+======+======+======+======+======+__ */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#007AFF"
          style={{ marginTop: 50 }}
        />
      ) : (
        <FlatList
          data={leaders}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <PlayerTab item={item} index={index} />
          )}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No one has played {selectedDifficulty} yet. Be the first!
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  list: {
    padding: 15,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#888",
    fontSize: 16,
  },
});
