import { Outlet } from "react-router-dom";
import HomeNavbar from "./HomeNavbar";
import { Suspense } from "react";
import BlankSekeleton from "../BlankSkeleton";

const HomeLayout = () => {
  return (
    <div className="h-full">
      <HomeNavbar />
      <Suspense fallback={<BlankSekeleton />}>
        <div className="pt-14 h-full">
          <Outlet />
        </div>
      </Suspense>
    </div>
  );
};

export default HomeLayout;
