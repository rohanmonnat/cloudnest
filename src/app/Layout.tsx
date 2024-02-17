import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="h-full bg-zinc-900 text-white">
      <Outlet />
    </div>
  );
};

export default Layout;
