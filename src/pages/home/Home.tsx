import { Button } from "../../components";
import useAuth from "../../hooks/useAuth";
import useLoader from "../../hooks/useLoader";

const Home = () => {
  const { user, logout } = useAuth();
  const { loader, setLoader } = useLoader(false);
  console.log(user);

  const handleLogout = async () => {
    setLoader(true);
    try {
      await logout();
      console.log("logged out");
    } catch (e) {
      alert("error");
      console.error(e);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      Home page
      <Button onClick={handleLogout} disabled={loader}>
        Logout
      </Button>
    </div>
  );
};

export default Home;
