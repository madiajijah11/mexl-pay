import Image from "next/image";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { axiosInstance } from "../helpers/axios.helper";
import jwtDecode from "jwt-decode";
import IsLogin from '../components/isLogin'

import PhoneImage from "../images/Group-57.png";
import { useState } from "react";

YupPassword(Yup);

const PinSchema = Yup.object().shape({
  pin1: Yup.number().required(),
  pin2: Yup.number().required(),
  pin3: Yup.number().required(),
  pin4: Yup.number().required(),
  pin5: Yup.number().required(),
  pin6: Yup.number().required(),
});

function CreatePin() {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const token = useSelector((state) => state?.auth?.token);
  const { id } = jwtDecode(token);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(PinSchema),
    defaultValues: {
      pin1: "",
      pin2: "",
      pin3: "",
      pin4: "",
      pin5: "",
      pin6: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const pin = `${data.pin1}${data.pin2}${data.pin3}${data.pin4}${data.pin5}${data.pin6}`;
      const createPIN = await axiosInstance.post("auth/set-pin", {
        userId: id,
        pin,
      });
      if (createPIN.data.success === true) {
        setIsSuccess(true);
        setIsError(false);
        setIsLoading(false);
      }
      router.push("/home");
    } catch (error) {
      if (error) {
        setIsError(true);
        setIsSuccess(false);
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Create PIN: MexL Pay</title>
        <meta name="description" content="Create PIN MexL Pay" />
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
              Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN
              That You Created Yourself.
            </div>
            <p className="mb-10">
              Create 6 digits pin to secure all your money and your data in MexL
              Pay app. Keep it secret and don’t tell anyone about your MexL Pay
              account password and the PIN.
            </p>
            {isError && (
              <div className="text-error font-bold text-center">
                Network Error, Please Try Again
              </div>
            )}
            {isSuccess && (
              <div className="text-success font-bold text-center">
                PIN Created Successfully
              </div>
            )}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-10"
            >
              <div className="w-full flex gap-5">
                <input
                  name="pin1"
                  {...register("pin1", { required: true })}
                  type="text"
                  maxLength="1"
                  className="text-center rounded-lg w-2/12 h-12"
                />
                <input
                  name="pin2"
                  {...register("pin2", { required: true })}
                  type="text"
                  maxLength="1"
                  className="text-center rounded-lg w-2/12 h-12"
                />
                <input
                  name="pin3"
                  {...register("pin3", { required: true })}
                  type="text"
                  maxLength="1"
                  className="text-center rounded-lg w-2/12 h-12"
                />
                <input
                  name="pin4"
                  {...register("pin4", { required: true })}
                  type="text"
                  maxLength="1"
                  className="text-center rounded-lg w-2/12 h-12"
                />
                <input
                  name="pin5"
                  {...register("pin5", { required: true })}
                  type="text"
                  maxLength="1"
                  className="text-center rounded-lg w-2/12 h-12"
                />
                <input
                  name="pin6"
                  {...register("pin6", { required: true })}
                  type="text"
                  maxLength="1"
                  className="text-center rounded-lg w-2/12 h-12"
                />
              </div>
              {errors.pin1 ||
              errors.pin2 ||
              errors.pin3 ||
              errors.pin4 ||
              errors.pin5 ||
              errors.pin6 ? (
                <span className="text-error -mt-8">PIN is required</span>
              ) : null}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!isDirty || !isValid || isLoading}
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

export default IsLogin(CreatePin);