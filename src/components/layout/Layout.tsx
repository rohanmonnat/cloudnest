import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <div className="h-full bg-zinc-900 text-white">
      <Outlet />
      <Toaster />
    </div>
  );
};

export default Layout;
