import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import HomeLayout from "./HomeLayout";
import BlankLoadingScreen from "../BlankLoadingScreen";

const ProtectedRoute = () => {
  const { user, loader } = useAuth();

  if (loader) {
    return <BlankLoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return <HomeLayout />;
};

export default ProtectedRoute;
