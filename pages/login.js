import Image from "next/image";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify-icon/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import YupPassword from "yup-password";

import PhoneImage from "../images/Group-57.png";
import { useState } from "react";
import Link from "next/link";

YupPassword(Yup);

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string()
    .min(8)
    .max(16)
    .required()
    .password()
    .minLowercase(1)
    .minUppercase(1)
    .minNumbers(1)
    .minSymbols(1),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <Head>
        <title>Login: MexL Pay</title>
        <meta name="description" content="Login to MexL Pay" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex h-screen">
          <div className="w-3/5 py-16 px-14 bg-primary gap-5 flex flex-col justify-center">
            <div>
              <div className="text-secondary font-bold text-2xl btn glass btn-disabled">
                MexL Pay
              </div>
            </div>
            <div className="relative w-full flex flex-col items-center">
              <Image
                src={PhoneImage}
                alt="Phone Image"
                width={500}
                height={500}
              />
            </div>
            <div className="font-bold text-2xl">
              App that Covering Banking Needs.
            </div>
            <p>
              MexL Pay is an application that focussing in banking needs for all
              users in the world. Always updated and always following world
              trends. 5000+ users registered in MexL Pay everyday with worldwide
              users coverage.
            </p>
          </div>
          <div className="w-2/5 py-16 px-14 flex flex-col gap-5 justify-center">
            <div className="font-bold text-2xl">
              Start Accessing Banking Needs With All Devices and All Platforms
              With 30.000+ Users
            </div>
            <p className="mb-20">
              Transfering money is eassier than ever, you can access FazzPay
              wherever you are. Desktop, laptop, mobile phone? we cover all of
              that for you!
            </p>
            <form
              onClick={handleSubmit(onSubmit)}
              className="flex flex-col gap-10"
            >
              <div>
                <div className="w-full input-group">
                  <span>
                    <Icon icon="mdi:email" width="35" height="35" />
                  </span>
                  <input
                    name="email"
                    type="text"
                    placeholder="Enter your e-mail"
                    className="input input-bordered input-primary w-full"
                    {...register("email", { required: true })}
                  />
                </div>
                {errors.email && (
                  <span className="text-error mt-2">
                    {errors.email?.message}
                  </span>
                )}
              </div>
              <div>
                <div className="w-full input-group relative">
                  <span>
                    <Icon icon="mdi:lock" width="35" height="35" />
                  </span>
                  {showPassword ? (
                    <Icon
                      icon="mdi:eye-off"
                      className="absolute top-1 right-2 z-10"
                      width="35"
                      height="35"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <Icon
                      icon="mdi:eye"
                      className="absolute top-1 right-2 z-10"
                      width="35"
                      height="35"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="input input-bordered input-primary w-full"
                    {...register("password", { required: true })}
                  />
                </div>
                {errors.password && (
                  <span className="text-error mt-2">
                    {errors.password?.message}
                  </span>
                )}
              </div>
              <div className="-mt-8 text-right">
                <Link href="#" className="hover:text-secondary">
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!isDirty || !isValid}
              >
                Login
              </button>
            </form>
            <div className="text-center">
              Don’t have an account?{" "}
              <Link href="/register" className="hover:text-secondary">
                Let’s Sign Up
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}