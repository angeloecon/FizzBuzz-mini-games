import { db } from "@/firebase/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const saveHighScore = async (
  user: any,
  difficultyKey: string,
  score: number,
) => {
  if (!user) return;

  try {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      const currentHighScore = userData.highScore?.[difficultyKey] || 0;

      // Only update if they beat their high score +======+======+======+======+======+======+======+
      if (score > currentHighScore) {
        await updateDoc(userRef, {
          [`highScore.${difficultyKey}`]: score,
          lastPlayed: new Date(),
        });
      }
    } else {
      // Create new user document if it doesn't exist +======+======+======+======+======+======+======+
      await setDoc(userRef, {
        userName: user.email?.split("@")[0] || "Unknown",
        highScore: {
          [difficultyKey]: score,
        },
        lastPlayed: new Date(),
      });
    }
  } catch (error) {
    console.error("Error saving score:", error);
  }
};

// Fetches top 20 players for each selected difficulty +======+======+======+======+======+======+======+
//
export const fetchHighScoreList = async (selectedDifficulty: string) => {
  try {
    const userReference = collection(db, "users");
    const queryList = query(
      userReference,
      orderBy(`highScore.${selectedDifficulty}`, "desc"),
      limit(20),
    );
    const querySnapshot = await getDocs(queryList);

    const highScoreList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      username: doc.data().userName || "Unknown",
      score: doc.data().highScore?.[selectedDifficulty] || 0,
    }));

    return highScoreList.filter((player) => player.score > 0);
  } catch (error) {
    console.error("Error fetching high score list:", error);
    throw error;
  }
};
