import { AuthProvider } from "@/context/AuthContext";
import { Audio } from "expo-av";
import { Stack } from "expo-router";
import { createContext, useContext, useEffect, useRef, useState } from "react";

//music context for global mussic control
const MusicContext = createContext({
  stopMusic: () => Promise.resolve(),
  startMusic: () => Promise.resolve(),
  toggleMute: () => {},
  isMuted: false, 
});

export const useMusic = () => useContext(MusicContext);

export default function RootLayout() {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [isMuted, setIsMuted] = useState(false); // Default: Not Muted

  const startMusic = async () => {
  if (soundRef.current) {
   
    await soundRef.current.playAsync();
    return;
  }

  try {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audio/bg_music_game.mp3"),
      { 
        isLooping: true, 
        volume: 0.2, 
        shouldPlay: true,
        isMuted: isMuted 
      }
    );
    soundRef.current = sound;
  } catch (e) {
    console.log("Music Load Error:", e);
  }
};

  const stopMusic = async () => {
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
  };

  const toggleMute = async () => {
    const nextMuteState = !isMuted;
    setIsMuted(nextMuteState);
    
    if (soundRef.current) {
      await soundRef.current.setIsMutedAsync(nextMuteState);
    }
  };

  useEffect(() => {
    
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      interruptionModeIOS: 1, // DoNotMix
      shouldDuckAndroid: true,
      interruptionModeAndroid: 1,
    });

    startMusic();

    return () => {
      stopMusic();
    };
  }, []);

  return (
    <AuthProvider>
      <MusicContext.Provider value={{ stopMusic, startMusic, toggleMute, isMuted }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="game" />
          <Stack.Screen name="dashboard" />
          <Stack.Screen name="scoreBoard" />
        </Stack>
      </MusicContext.Provider>
    </AuthProvider>
  );
} 