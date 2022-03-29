import type { NextPage } from "next";
import Head from "next/head";
import Input from "../components/Input";
import { useFormik } from "formik";
import Button from "../components/Button";
import Link from "next/link";
import { API, setCookies } from "../lib/utils";
import { useRouter } from "next/router";
import { useState } from "react";

interface SignUpFormProps {
  username: string;
  password: string;
  confirm: string;
}

const SignUp: NextPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const form = useFormik<SignUpFormProps>({
    initialValues: {
      username: "",
      password: "",
      confirm: "",
    },
    onSubmit: async (values) => {
      setError("");

      try {
        const { data } = await API.post("/users/auth/signup", values);
        setCookies(data.token);
        router.push("/");
      } catch (err: any) {
        setError(err.response.data.message);
      }
    },
  });

  return (
    <div>
      <Head>
        <title>Ramp Up - sample app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex items-center justify-center h-screen w-screen bg-slate-200">
        <div className="max-w-xs w-full shadow-md rounded-lg bg-white p-3">
          <div className="text-center text-lg font-semibold mb-3">
            Create user
          </div>
          <form onSubmit={form.handleSubmit}>
            <div>
              <Input
                required
                placeholder="Username"
                name="username"
                onChange={form.handleChange}
                className="mb-3"
              />
              <Input
                required
                type="password"
                placeholder="Password"
                name="password"
                onChange={form.handleChange}
                className="mb-3"
              />
              <Input
                required
                type="password"
                placeholder="Confirm"
                name="confirm"
                onChange={form.handleChange}
              />
            </div>

            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

            <div className="h-[1px] bg-slate-300 my-3 w-full"></div>

            <div className="">
              <Button
                disabled={form.isSubmitting}
                type="submit"
                className="mb-2 disabled:bg-slate-400"
              >
                Sign up
              </Button>

              <div className="text-center">
                <Link href="/login" passHref>
                  <a className="py-2 inline-flex text-indigo-400 focus:text-orange-500">
                    Login
                  </a>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
