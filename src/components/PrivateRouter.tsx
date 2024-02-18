import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import HomeLayout from "./layout/HomeLayout";

const PrivateRoute = () => {
  const { user, loader } = useAuth();

  if (loader) {
    return <div>Loading</div>;
  }

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return <HomeLayout />;
};

export default PrivateRoute;
