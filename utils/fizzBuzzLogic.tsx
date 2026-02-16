export type FizzBuzzResult = "Fizz" | "Buzz" | "FizzBuzz" | "Number";

export const checkFizzBuzz = (num: number): FizzBuzzResult => {
  if (num % 15 === 0) return "FizzBuzz";
  if (num % 3 === 0) return "Fizz";
  if (num % 5 === 0) return "Buzz";
  return "Number";
};

export const generateRandomNumber = (
  min: number = 1,
  max: number = 100,
): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
