"use client";

import { UserLoggedContext } from "@/contexts/userLoggedContext";
import useAuth from "@/hooks/login/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import InputWithError from "@/components/inputWithError";

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { loggedUser } = useContext(UserLoggedContext);
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await login(data.email, data.password);

    if (loggedUser) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="mx-auto xl:w-1/3 md:w-2/3 xs:w-full h-screen mt-3.5">
      <div className="text-center mb-8">
        <Image
          className="mx-auto"
          src="./maizum.svg"
          width={260}
          height={150}
          alt="Maizum logo"
          priority
        />
        <h2 className="text-2xl font-semibold">
          Welcome! Nice to see you here
        </h2>
        <p>Sign in by entering the information below</p>
      </div>

      <div className="w-4/6 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputWithError
            labelName="Email"
            inputId="input-email"
            registerError={register("email", {
              required: "This field is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            error={{
              show: Boolean(errors?.email),
              title: "Input invalid!",
              message: errors?.email?.message,
            }}
          />

          <div className="relative">
            <InputWithError
              labelName="Password"
              inputId="input-password"
              registerError={register("password", {
                required: "This field is required",
              })}
              error={{
                show: Boolean(errors?.password),
                title: "Input invalid!",
                message: errors.password?.message,
              }}
              type={showPassword ? "text" : "password"}
            />

            <button
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
              className="btn btn-ghost btn-xs w-1 absolute right-6 top-12"
            >
              peek
            </button>
          </div>

          <button className="btn btn-primary w-full my-4" type="submit">
            Login
          </button>
        </form>

        <Link className="text-center link link-secondary" href="/register">
          Don't have an account? Click here to create one
        </Link>
      </div>
    </div>
  );
}
