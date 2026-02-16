import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBar, TabMenu } from "../components/scoreboard";
import { db } from "../config/firebase";

type Player = {
  id: string;
  username: string;
  score: number;
};

const DIFFICULTIES = ["easy", "normal", "hard", "expert"];

export default function ScoreBoardScreen() {
  const router = useRouter();
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [leaders, setLeaders] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLeaderboard(selectedDifficulty);
  }, [selectedDifficulty]);

  const fetchLeaderboard = async (difficulty: string) => {
    setLoading(true);
    setLeaders([]);

    try {
      const usersRef = collection(db, "users");

      // Query: Order by the nested field
      // Note: "highScores." + difficulty creates the path 'highScores.easy'
      // The current path is "highScore.difficulty" where difficulty is = easy, normal, hard, expert
      // naka limit og 20
      const q = query(
        usersRef,
        orderBy(`highScore.${difficulty}`, "desc"),
        limit(20),
      );

      const querySnapshot = await getDocs(q);

      const players: Player[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        const score = data.highScore?.[difficulty] || 0;

        if (score > 0) {
          players.push({
            id: doc.id,
            username: data.userName || "Unknown",
            score: score,
          });
        }
      });

      setLeaders(players);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  // ------- Render Functions -------
  const renderPlayer = ({ item, index }: { item: Player; index: number }) => {
    let rankColor = "#333";
    let icon = null;

    if (index === 0) {
      rankColor = "#FFD700";
      icon = "trophy";
    } else if (index === 1) {
      rankColor = "#C0C0C0";
      icon = "medal";
    } else if (index === 2) {
      rankColor = "#CD7F32";
      icon = "medal";
    }

    return (
      <View style={styles.card}>
        <View style={styles.rankContainer}>
          <Text style={[styles.rank, { color: rankColor }]}>{index + 1}</Text>
          {icon && <Ionicons name={icon as any} size={20} color={rankColor} />}
        </View>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.score}>{item.score}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header __________________________ */}
      <HeaderBar onGoBack={handleGoBack} />

      {/* Tabs for Difficulty __________________________ */}
      <TabMenu
        tabs={DIFFICULTIES}
        activeTab={selectedDifficulty}
        onTabChange={setSelectedDifficulty}
      />

      {/* The List __________________________ */}
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
          renderItem={renderPlayer}
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
  container: { flex: 1, backgroundColor: "#F2F2F7" },

  // List Styles --------------------------
  list: { padding: 15 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  rankContainer: {
    width: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  rank: { fontSize: 18, fontWeight: "bold", marginRight: 4 },
  username: { fontSize: 16, flex: 1, fontWeight: "500" },
  score: { fontSize: 20, fontWeight: "bold", color: "#007AFF" },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#888",
    fontSize: 16,
  },
});
