import useAuth from "../../hooks/useAuth";
import useLoader from "../../hooks/useLoader";
import Button from "../Button";
import IconButton from "../IconButton";
import { LogOut } from "lucide-react";
import BrandLogo from "../BrandLogo";
import { showToast } from "../Toast";

const HomeNavbar = () => {
  const { logout } = useAuth();
  const { loader, setLoader } = useLoader(false);
  const handleLogout = async () => {
    setLoader(true);
    try {
      await logout();
      showToast("Logged out successfully", "success");
    } catch (e) {
      alert("error");
      console.error(e);
      showToast("Failed to log out", "error");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 h-14 w-full bg-zinc-900 border-b-[1px] border-zinc-700 flex px-8 py-4 items-center justify-between">
      <Button
        asLink
        href="/"
        mode="dark"
        className="border-0 flex items-center justify-center gap-2"
        variant="ghost"
      >
        <BrandLogo />
        <span>Cloud Nest</span>
      </Button>
      <IconButton
        icon={<LogOut size={16} />}
        onClick={handleLogout}
        disabled={loader}
        mode="dark"
      />
    </div>
  );
};

export default HomeNavbar;
