import { createContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import auth from "../config/auth";
import useLoader from "../hooks/useLoader";

type AuthContextType = {
  user: User | null;
  login: (
    email: string,
    password: string
  ) => ReturnType<typeof signInWithEmailAndPassword>;
  register: (
    email: string,
    password: string
  ) => ReturnType<typeof createUserWithEmailAndPassword>;
  logout: () => ReturnType<typeof signOut>;
  loader: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};
const register = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
const logout = () => {
  return signOut(auth);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<null | User>(null);
  const { loader, setLoader } = useLoader(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoader(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loader,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
