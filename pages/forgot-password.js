import Image from "next/image";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify-icon/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import YupPassword from "yup-password";

import PhoneImage from "../images/Group-57.png";

YupPassword(Yup);

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email().required(),
});

export default function ForgotPassword() {

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <Head>
        <title>Forgot Password: MexL Pay</title>
        <meta name="description" content="Forgot Password MexL Pay" />
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
              Did You Forgot Your Password? Don’t Worry, You Can Reset Your
              Password In a Minutes.
            </div>
            <p className="mb-10">
              To reset your password, you must type your e-mail and we will send
              a link to your email and you will be directed to the reset
              password screens.
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
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!isDirty || !isValid}
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
