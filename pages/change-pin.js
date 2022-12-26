import Head from "next/head";
import NavbarHome from "../components/navbarHome";
import FooterHome from "../components/footerHome";
import HomeMenu from "../components/homeMenu";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { Icon } from "@iconify-icon/react";

YupPassword(Yup);

const ChangePinSchema = Yup.object().shape({
  pin1: Yup.number().required(),
  pin2: Yup.number().required(),
  pin3: Yup.number().required(),
  pin4: Yup.number().required(),
  pin5: Yup.number().required(),
  pin6: Yup.number().required(),
});

const ChangePasswordContent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(ChangePinSchema),
    defaultValues: {
      pin1: "",
      pin2: "",
      pin3: "",
      pin4: "",
      pin5: "",
      pin6: "",
    },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <section>
      <div className="px-40 py-20 flex gap-5">
        <HomeMenu />
        <div className="w-full flex flex-col gap-5 bg-neutral p-10 rounded-box shadow-xl">
          <div className="flex flex-col gap-10 py-5">
            <div className="font-bold">Change Password</div>
            <p className="w-1/3">
              You must enter your current password and then type your new
              password twice.
            </p>
            <div className="w-full items-center justify-center flex">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-1/3 mt-10 gap-10"
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
                  className="btn btn-primary w-full"
                  disabled={!isDirty || !isValid}
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function ChangePin() {
  return (
    <>
      <Head>
        <title>Change PIN: MexL Pay</title>
        <meta name="description" content="Change PIN MexL Pay" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarHome />
      <ChangePasswordContent />
      <FooterHome />
    </>
  );
}