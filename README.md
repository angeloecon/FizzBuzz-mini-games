# FizzBuzz Mini Game

Welcome to the **FizzBuzz Mini Game**, a fun and interactive mobile application built with [React Native](https://reactnative.dev/) and [Expo](https://expo.dev/).

## 🎮 About the Game

This is a modern twist on the classic FizzBuzz game. Test your quick thinking and reflexes by correctly identifying whether a given number is:
- **Fizz** (Divisible by 3)
- **Buzz** (Divisible by 5)
- **FizzBuzz** (Divisible by both 3 and 5)
- **Number** (None of the above)

With varying difficulty levels, time limits, and a life system, how high can you score before the time runs out?  

## 🚀 Features

- **Multiple Difficulties:** Play on different difficulty settings (e.g., Easy, Normal, Expert) with varying time constraints and mechanics.
- **Lives & Timer System:** Make quick decisions! You have limited time per round and a limited number of lives.
- **Firebase Integration:** 
  - User Authentication (Login/Register).
  - Global Scoreboard to track and save high scores using Firestore.
- **Immersive Audio:** Background music and sound effects  powered by `expo-av`.
- **Modern Navigation:** File-based routing powered by Expo Router.

## 🛠️ Tech Stack

- **Framework:** React Native, Expo
- **Language:** TypeScript
- **Routing:** Expo Router
- **Backend/Database:** Firebase (Auth & Firestore)
- **Audio:** `expo-av`
- **Animations:** `react-native-reanimated`

## 🏃‍♂️ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory and add your Firebase configuration:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Start the app

```bash
npx expo start
```

In the output, you'll find options to open the app in a:
- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

## 📁 Project Structure

- `app/` - Expo Router screens  
- `components/` - Reusable UI components.
- `context/` - React Context providers  
- `firebase/` - Firebase configuration and setup.
- `services/` - External services  
- `utils/` - Helper functions and game logic  

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.
