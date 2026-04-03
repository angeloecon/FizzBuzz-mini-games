import AnswerButton from "@/components/ui/buttons/answer-button";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BASE_ANSWER_OPTIONS, GAME_DIFFICULTIES } from "@/constant/gameConfig";
import { useAuth } from "@/context/AuthContext";
import { saveHighScore } from "@/services/scoreServices";
import { FizzBuzzResult } from "@/types";
import { shuffleArray } from "@/utils/shuffleArray";
import { checkFizzBuzz, generateRandomNumber } from "../utils/fizzBuzzLogic";

export default function GameScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const difficultyKey = (useLocalSearchParams().difficulty as string) || "easy";
  const config = GAME_DIFFICULTIES[difficultyKey];

  // States  +======+======+======+======+======+======+======+____
  const [answerButtons, setAnswerButtons] = useState(BASE_ANSWER_OPTIONS);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(config.timePerRound);
  const [isJumping, setIsJumping] = useState(false);
  const [currentNumber, setCurrentNumber] = useState(
    generateRandomNumber(1, config.maxNumber),
  );

  // Timer Logic   +======+======+======+======+======+======+======+____
  useEffect(() => {
    if (gameOver) return;
    if (timeLeft === 0) {
      handleWrongAnswer();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, gameOver]);

  // Game Logic  +======+======+======+======+======+======+======+____

  const handleAnswer = (choice: FizzBuzzResult) => {
    if (choice === checkFizzBuzz(currentNumber)) {
      setScore(score + 1);
      resetRound();
    } else {
      handleWrongAnswer();
    }
  };

  const handleWrongAnswer = () => {
    if (lives > 1) {
      setLives(lives - 1);
      resetRound();
    } else {
      if (difficultyKey === "expert") {
        triggerJump();
      } else {
        handleEndGame();
      }
    }
  };

  const triggerJump = () => {
    setGameOver(true);
    setIsJumping(true);
    setTimeout(() => {
      setIsJumping(false);
      handleEndGame();
    }, 1500);
  };

  const resetRound = () => {
    setCurrentNumber(generateRandomNumber(1, config.maxNumber));
    setTimeLeft(config.timePerRound);

    if (difficultyKey === "expert") {
      // Shuffle answer options for expert mode for more challange
      setAnswerButtons(shuffleArray(BASE_ANSWER_OPTIONS));
    } else {
      setAnswerButtons(BASE_ANSWER_OPTIONS);
    }
  };

  const handleEndGame = () => {
    setGameOver(true);

    Alert.alert("Game Over!", `Final Score: ${score}`, [
      { text: "Play Again", onPress: restartGame },
      { text: "Home", onPress: () => router.replace("/dashboard") },
    ]);

    // Save to firebase
    saveHighScore(user, difficultyKey, score);
  };

  const restartGame = () => {
    setScore(0);
    setLives(3);
    setGameOver(false);
    resetRound();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Info  +======+======+======+======+======+======+======+____*/}
      <View style={styles.header}>
        <Text style={styles.statText}>❤️ {lives}</Text>
        <Text style={styles.statText}>🏆 {score}</Text>
        <Text
          style={[styles.statText, { color: timeLeft <= 3 ? "red" : "black" }]}
        >
          ⏰ {timeLeft}s
        </Text>
      </View>

      {/* Number Display  +======+======+======+======+======+======+======+____*/}
      <View style={styles.questionContainer}>
        <Text style={styles.label}>Number:</Text>
        <Text style={styles.number}>{currentNumber}</Text>
      </View>

      {/* DRY Answer Buttons  +======+======+======+======+======+======+======+____*/}
      <View style={styles.buttonGrid}>
        {answerButtons.map((option) => (
          <AnswerButton
            key={option.text}
            onPress={() => handleAnswer(option.value)}
            text={option.text}
            style={option.styles}
          />
        ))}
      </View>

      {isJumping && (
        <View style={styles.jumpscareContainer}>
          <Image
            source={require("../assets/images/images.jpg")}
            style={styles.jumpscareImage}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 50,
    marginTop: 20,
  },
  statText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  questionContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  label: {
    fontSize: 20,
    color: "#666",
  },
  number: {
    fontSize: 80,
    fontWeight: "bold",
    color: "#333",
  },
  buttonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 15,
  },
  //
  jumpscareContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    zIndex: 9999,
    justifyContent: "center",
    alignItems: "center",
    elevation: 99,
  },
  jumpscareImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
