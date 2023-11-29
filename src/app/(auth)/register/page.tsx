"use client";

import AuthHeader from "@/components/component/AuthHeader";
import InputText from "@/components/elements/Input";
import Label from "@/components/elements/Label";
import RadioButton from "@/components/elements/RadioButton";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const { status }: { status: string } = useSession();
  const { push } = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    gender: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await axios.post("/api/auth/register", formData);
      if (res.status === 200) {
        e.target.reset();
        setIsLoading(false);
        push("/login");
      }
    } catch (error) {
      setError("Email already exist");
      setIsLoading(false);
    }
  };

  if (status === "authenticated") {
    redirect("/dashboard");
  }

  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="p-10">
        <AuthHeader errorInfo={error} text="Create your account." />
        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
            <div>
              <Label htmlFor="fullname" text="Fullname" />
              <InputText
                id="fullname"
                name="fullname"
                onChange={handleChange}
                type="text"
                value={formData.fullname}
              />
            </div>

            <div>
              <Label htmlFor="email" text="Email address" />
              <InputText
                id="email"
                name="email"
                onChange={handleChange}
                type="email"
                value={formData.email}
              />
            </div>

            <div>
              <Label htmlFor="password" text="Password" />
              <InputText
                id="password"
                name="password"
                onChange={handleChange}
                type="password"
                value={formData.password}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <RadioButton
                checked={formData.gender}
                gender="Male"
                onChange={handleChange}
              />
              <RadioButton
                checked={formData.gender}
                gender="Female"
                onChange={handleChange}
              />
            </div>

            <div>
              <button
                disabled={isLoading}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? "Loading ..." : "Sign up"}
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Have an account?{" "}
            <Link
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <div className="bg-img-register bg-cover "></div>
    </div>
  );
}
