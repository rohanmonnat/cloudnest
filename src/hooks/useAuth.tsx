import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth can only be used inside Auth Context");
  }

  return context;
};

export default useAuth;
