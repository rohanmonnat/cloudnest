import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import AuthLayout from "./AuthLayout";
import BlankLoadingScreen from "../BlankLoadingScreen";

const AuthRoute = () => {
  const { loader, user } = useAuth();

  if (loader) {
    return <BlankLoadingScreen />;
  }

  if (user) {
    return <Navigate to="/" />;
  }

  console.log("dont go beyond this");

  return <AuthLayout />;
};

export default AuthRoute;
