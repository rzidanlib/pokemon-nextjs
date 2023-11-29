"use client";

import AuthHeader from "@/components/component/AuthHeader";
import InputText from "@/components/elements/Input";
import Label from "@/components/elements/Label";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const { status }: { status: string } = useSession();
  const { push } = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: e.target.email.value,
        password: e.target.password.value,
        callbackUrl: "/dashboard",
      });
      if (!res?.error) {
        e.target.reset();
        setIsLoading(false);
        push("/dashboard");
      } else {
        setIsLoading(false);
        if (res.status === 401) {
          setError("Username or Password incorrect");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (status === "authenticated") {
    push("/dashboard");
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <AuthHeader errorInfo={error} text="Sign In to your account." />

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={(e) => handleLogin(e)}>
          <div>
            <Label htmlFor="email" text="Email address" />
            <InputText id="email" name="email" type="email" />
          </div>

          <div>
            <Label htmlFor="password" text="Password" />
            <InputText id="password" name="password" type="password" />
          </div>

          <div>
            <button
              disabled={isLoading}
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading ? "Loading ..." : "Sign in"}
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            href="/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
