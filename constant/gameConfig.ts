import { DifficultyMenuItem, FizzBuzzResult } from "@/types";

export const GAME_DIFFICULTIES: Record<
  string,
  { maxNumber: number; timePerRound: number }
> = {
  easy: { maxNumber: 50, timePerRound: 20 },
  normal: { maxNumber: 100, timePerRound: 15 },
  hard: { maxNumber: 200, timePerRound: 10 },
  expert: { maxNumber: 500, timePerRound: 5 },
};

export const BASE_ANSWER_OPTIONS = [
  {
    text: "Normal",
    value: "Number" as FizzBuzzResult,
    styles: { color: "#3459db" },
  },
  {
    text: "Fizz",
    value: "Fizz" as FizzBuzzResult,
    styles: { color: "#fbff09" },
  },
  {
    text: "Buzzz",
    value: "Buzz" as FizzBuzzResult,
    styles: { color: "#2ecc71" },
  },
  {
    text: "FizzBuzz",
    value: "FizzBuzz" as FizzBuzzResult,
    styles: { color: "#e74c3c" },
  },
];

export const DifficultyMenuList: DifficultyMenuItem[] = [
  { title: "Easy", color: "#4CD964", icon: "bicycle", key: "easy" },
  { title: "Normal", color: "#007AFF", icon: "car-sport", key: "normal" },
  { title: "Hard", color: "#ff5100", icon: "airplane", key: "hard" },
  { title: "Expert", color: "#ff0d00", icon: "rocket", key: "expert" },
];
