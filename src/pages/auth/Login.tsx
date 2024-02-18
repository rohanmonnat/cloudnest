import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../../components";
import useAuth from "../../hooks/useAuth";
import useLoader from "../../hooks/useLoader";
import { showToast } from "../../components/Toast";
import { z } from "zod";
import { FirebaseError } from "firebase/app";

type UserCredentials = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Invalid email",
    })
    .email({ message: "Invalid email" })
    .min(5, { message: "Email must be atleat 5 characters long" })
    .trim(),
  password: z.coerce
    .string({
      required_error: "Password is required",
      invalid_type_error: "Invalid password",
    })
    .min(8, { message: "Password must be atleast 8 characters long" })
    .trim(),
});

type FormatedError = z.ZodFormattedError<{
  email: string;
  password: string;
}>;

const getFlatSchemaError = (
  error: FormatedError | null,
  key: "email" | "password"
) => {
  const errors = error?.[key]?._errors;
  if (!errors) {
    return;
  }

  return errors[0];
};

const Login = () => {
  const [state, setState] = useState<UserCredentials>({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<null | FormatedError>(null);

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
    setFormErrors(null);
    event.preventDefault();
    setLoader(true);
    try {
      const result = schema.safeParse(state);

      if (!result.success) {
        setFormErrors(result.error.format());
        return;
      }

      const { email, password } = result.data;
      await login(email, password);
      showToast("Logged in successfully", "success");
      navigate("/");
    } catch (e) {
      const errorCode = (e as FirebaseError).code;
      switch (errorCode) {
        case "auth/invalid-credential":
          showToast("Invalid email or password", "error", 3000);
          break;

        default:
          showToast("Failed to log in", "error", 3000);
      }
      console.error(e);
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
              type="email"
              error={Boolean(getFlatSchemaError(formErrors, "email"))}
              helperText={getFlatSchemaError(formErrors, "email")}
            />
            <Input
              name="password"
              onChange={handleChange}
              value={state.password}
              label="Password"
              placeholder="••••••••••••"
              type="password"
              error={Boolean(getFlatSchemaError(formErrors, "password"))}
              helperText={getFlatSchemaError(formErrors, "password")}
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
