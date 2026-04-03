// exports types  +======+======+======+======+======+======+======+
import { Ionicons } from "@expo/vector-icons";

export type Player = { id: string; username: string; score: number };

export type FizzBuzzResult = "Fizz" | "Buzz" | "FizzBuzz" | "Number";

export type DifficultyMenuItem = {
  title: string;
  color: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  key: string;
};
