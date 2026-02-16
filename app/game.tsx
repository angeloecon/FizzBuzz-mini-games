import AnswerButton from "@/components/ui/buttons/answer-button";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../config/firebase";
import {
  checkFizzBuzz,
  FizzBuzzResult,
  generateRandomNumber,
} from "../utils/fizzBuzzLogic";

const gameDifficulties: Record<
  string,
  { maxNumber: number; timePerRound: number }
> = {
  easy: { maxNumber: 50, timePerRound: 20 },
  normal: { maxNumber: 100, timePerRound: 15 },
  hard: { maxNumber: 200, timePerRound: 10 },
  expert: { maxNumber: 500, timePerRound: 5 },
};

export default function GameScreen() {
  const router = useRouter();
  const difficultyKey = (useLocalSearchParams().difficulty as string) || "easy";
  // * State depends on the difficulty -==-==-==-==-
  const [currentNumber, setCurrentNumber] = useState(
    generateRandomNumber(1, gameDifficulties[difficultyKey].maxNumber),
  );
  const [timeLeft, setTimeLeft] = useState(
    gameDifficulties[difficultyKey].timePerRound,
  );

  // * Game State -==-==-==-==-
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);

  // --- Timer Logic ---
  useEffect(() => {
    if (gameOver) return;

    if (timeLeft === 0) {
      handleWrongAnswer();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameOver]);

  // ------- Handle User Answer -------
  const handleAnswer = (choice: FizzBuzzResult) => {
    const correctAnswer = checkFizzBuzz(currentNumber);

    if (choice === correctAnswer) {
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
      endGame();
    }
  };

  const resetRound = () => {
    setCurrentNumber(
      generateRandomNumber(1, gameDifficulties[difficultyKey].maxNumber),
    );
    setTimeLeft(gameDifficulties[difficultyKey].timePerRound);
  };

  // ------- End Game & Save to Firebase // Save High Score to Firebase -------
  // TODO: Refactor this code for faster Alert response, should separate async function
  // from the Alert
  const endGame = async () => {
    setGameOver(true);

    try {
      const user = auth.currentUser;

      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          const currentHighScore = userData.highScore?.[difficultyKey] || 0;

          if (score > currentHighScore) {
            await updateDoc(userRef, {
              [`highScore.${difficultyKey}`]: score,
              lastPlayed: new Date(),
            });
          }
        } else {
          await setDoc(userRef, {
            userName: auth.currentUser?.email?.split("@")[0] || "Unknown",
            highScore: {
              [difficultyKey]: score,
            },
            lastPlayed: new Date(),
          });
        }
      }
    } catch (error) {
      console.error("Error saving score:", error);
    }

    Alert.alert("Game Over!", `Final Score: ${score}`, [
      { text: "Play Again", onPress: restartGame },
      {
        text: "Home",
        onPress: () => {
          router.replace("/dashboard");
        },
      },
    ]);
  };

  const restartGame = () => {
    setScore(0);
    setLives(3);
    setGameOver(false);
    resetRound();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Info __________________________ */}
      <View style={styles.header}>
        <Text style={styles.statText}>❤️ {lives}</Text>
        <Text style={styles.statText}>🏆 {score}</Text>
        <Text
          style={[styles.statText, { color: timeLeft <= 3 ? "red" : "black" }]}
        >
          ⏰ {timeLeft}s
        </Text>
      </View>

      {/* The Big Number __________________________ */}
      <View style={styles.questionContainer}>
        <Text style={styles.label}>Number:</Text>
        <Text style={styles.number}>{currentNumber}</Text>
      </View>

      {/* Answer Buttons __________________________ */}
      <View style={styles.buttonGrid}>
        <AnswerButton
          onPress={() => handleAnswer("Number")}
          text="Normal"
          style={styles.btnBlue}
        />

        <AnswerButton
          onPress={() => handleAnswer("Fizz")}
          text="Fizz"
          style={styles.btnYellow}
        />

        <AnswerButton
          onPress={() => handleAnswer("Buzz")}
          text="Buzz"
          style={styles.btnGreen}
        />

        <AnswerButton
          onPress={() => handleAnswer("FizzBuzz")}
          text="FizzBuzz"
          style={styles.btnRed}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 50,
    marginTop: 20,
  },
  statText: { fontSize: 24, fontWeight: "bold" },
  //
  questionContainer: { alignItems: "center", marginBottom: 60 },
  label: { fontSize: 20, color: "#666" },
  number: { fontSize: 80, fontWeight: "bold", color: "#333" },
  //
  buttonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 15,
  },
  btnBlue: { backgroundColor: "#3498db" }, // Normal
  btnYellow: { backgroundColor: "#f1c40f" }, // Fizz
  btnGreen: { backgroundColor: "#2ecc71" }, // Buzz
  btnRed: { backgroundColor: "#e74c3c" }, // FizzBuzz
});
