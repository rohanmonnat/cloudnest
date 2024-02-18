import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../../components";
import useAuth from "../../hooks/useAuth";
import useLoader from "../../hooks/useLoader";
import { showToast } from "../../components/Toast";

type UserCredentials = {
  email: string;
  password: string;
};

const Login = () => {
  const [state, setState] = useState<UserCredentials>({
    email: "",
    password: "",
  });

  const { loader, setLoader } = useLoader(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoader(true);
    try {
      const { email, password } = state;
      await login(email, password);
      showToast("Logged in successfully", "success");
      navigate("/");
    } catch (e) {
      console.error(e);
      showToast("Failed to log in", "error");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center px-4">
      <div className="flex flex-col w-full items-center gap-8">
        <h4 className="text-md text-zinc-200">Cloud Nest</h4>
        <h4 className="font-bold text-4xl">Welcome back</h4>
        <div className="h-full w-full max-w-[425px] bg-zinc-800 border-[1px] border-zinc-700 rounded-md p-8 py-16">
          <form className="h-full w-full flex flex-col gap-4 items-center">
            <Input
              name="email"
              onChange={handleChange}
              value={state.email}
              label="Email"
              placeholder="john.doe@example.com"
            />
            <Input
              name="password"
              onChange={handleChange}
              value={state.password}
              label="Password"
              placeholder="••••••••••••"
            />
            <Button
              type="submit"
              onClick={handleLogin}
              disabled={loader}
              className="w-full"
            >
              Submit
            </Button>
            <p className="text-sm text-white">
              Don't have an account?{" "}
              <Link to="/auth/register" className="underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
