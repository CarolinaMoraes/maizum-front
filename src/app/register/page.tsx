"use client";

import InputWithError from "@/components/inputWithError";
import FormSubmitAlert from "@/components/formSubmitAlert";
import useRegisterUser from "@/hooks/register/useRegisterUser";
import { RegisterUserPayload } from "@/types/registerUserPayload";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SubmitFormErrorReponse } from "@/types/submitFormErrorResponse";

interface Inputs extends RegisterUserPayload {
  confirmPassword: string;
}

function Register() {
  const { registerUser } = useRegisterUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [showPassword, setShowPassword] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [submitError, setSubmitError] =
    useState<AxiosError<SubmitFormErrorReponse> | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoadingRegister(true);

    const response = await registerUser({
      firstname: data.firstname,
      lastname: data.lastname,
      password: data.password,
      email: data.email,
    });

    setLoadingRegister(false);

    if (axios.isAxiosError(response)) {
      setSubmitError(response);
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
        <h2 className="text-2xl font-semibold">Let's get started</h2>
        <p>
          Fill the information below so that we can proceed with your
          registration
        </p>
      </div>

      <div className="w-5/6 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2">
            <InputWithError
              labelName="Firstname"
              inputId="input-firstname"
              registerError={register("firstname", {
                required: "This field is required",
                pattern: {
                  value: /^\S+.*$/,
                  message: "This field can't be blank",
                },
              })}
              error={{
                show: Boolean(errors?.firstname),
                title: "Input invalid!",
                message: errors?.firstname?.message,
              }}
            />

            <InputWithError
              labelName="Lastname"
              inputId="input-lastname"
              registerError={register("lastname", {
                required: "This field is required",
                minLength: 1,
                pattern: {
                  value: /^\S+.*$/,
                  message: "This field can't be blank",
                },
              })}
              error={{
                show: Boolean(errors?.lastname),
                title: "Input invalid!",
                message: errors?.lastname?.message,
              }}
            />
          </div>

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

          {Boolean(submitError) && (
            <FormSubmitAlert
              title="An error ocurred"
              message={
                submitError?.status === 500
                  ? "An internal error ocurred. Try again or contact support"
                  : submitError?.response?.data?.message
              }
              closeCallback={() => setSubmitError(null)}
            />
          )}

          <button className="btn btn-primary w-full my-4" type="submit">
            {loadingRegister ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <span>Register</span>
            )}
          </button>
        </form>

        <Link className="text-center link link-secondary" href="/login">
          Already have an account? Click here to login
        </Link>
      </div>
    </div>
  );
}

export default Register;
