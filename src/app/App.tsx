import { lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { AuthProvider } from "../contexts/auth";
import Layout from "../components/layout/Layout";
import AuthRoute from "../components/layout/AuthRoute";
import ProtectedRoute from "../components/layout/ProtectedRoute";

const NotFound = lazy(() => import("../pages/NotFound"));
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const Home = lazy(() => import("../pages/home/Home"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route element={<ProtectedRoute />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="auth" element={<AuthRoute />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const App = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default App;
