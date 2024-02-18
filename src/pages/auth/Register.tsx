import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "../../components";
import useAuth from "../../hooks/useAuth";
import { showToast } from "../../components/Toast";

type UserCredentials = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const [state, setState] = useState<UserCredentials>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loader, setLoader] = useState(false);

  const { register } = useAuth();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegister = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoader(true);
    try {
      const { email, password } = state;
      await register(email, password);
      showToast("Account created", "success");
    } catch (e) {
      console.error(e);
      showToast("Failed to create account", "error");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center px-4">
      <div className="flex flex-col w-full items-center gap-8">
        <h4 className="text-md text-zinc-200">Cloud Nest</h4>
        <h4 className="font-bold text-4xl">Get Started</h4>
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
            <Input
              name="confirmPassword"
              onChange={handleChange}
              value={state.confirmPassword}
              label="Confirm Password"
              placeholder="••••••••••••"
              helperText="Password must be 8 characters long"
            />
            <Button
              type="submit"
              onClick={handleRegister}
              disabled={loader}
              className="w-full"
            >
              Register
            </Button>
            <p className="text-sm text-white">
              Already have an account?{" "}
              <Link to="/auth/login" className="underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
