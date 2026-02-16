import { auth } from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  signOut as logOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
  signIn: async () => {},
  signUp: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing out: ", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await logOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error registering: ", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut, signIn, signUp }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
