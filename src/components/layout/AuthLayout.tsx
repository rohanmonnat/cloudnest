import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import AuthSkeleton from "../AuthSkeleton";

const AuthLayout = () => {
  return (
    <Suspense fallback={<AuthSkeleton />}>
      <Outlet />
    </Suspense>
  );
};

export default AuthLayout;
