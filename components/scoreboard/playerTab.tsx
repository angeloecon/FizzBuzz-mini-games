import { Player as PlayerTabProps } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const PlayerTab = ({
  item,
  index,
}: {
  item: PlayerTabProps;
  index: number;
}) => {
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
    icon = "trophy";
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

const styles = StyleSheet.create({
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
  rank: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 4,
  },
  username: {
    fontSize: 16,
    flex: 1,
    fontWeight: "500",
  },
  score: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
  },
});

export default PlayerTab;
