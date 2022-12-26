import Head from "next/head";
import NavbarHome from "../components/navbarHome";
import FooterHome from "../components/footerHome";
import HomeMenu from "../components/homeMenu";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { Icon } from "@iconify-icon/react";
import { useState } from "react";

YupPassword(Yup);

const ChangePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(8)
    .max(16)
    .required()
    .password()
    .minLowercase(1)
    .minUppercase(1)
    .minNumbers(1)
    .minSymbols(1),
  newPassword: Yup.string()
    .min(8)
    .max(16)
    .required()
    .password()
    .minLowercase(1)
    .minUppercase(1)
    .minNumbers(1)
    .minSymbols(1),
  confirmNewPassword: Yup.string()
    .min(8)
    .max(16)
    .required()
    .password()
    .minLowercase(1)
    .minUppercase(1)
    .minNumbers(1)
    .minSymbols(1),
});

const ChangePasswordContent = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = (data) => console.log(data);

  const showingPassword = () => {
    setShowPassword(!showPassword);
  };

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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center gap-5 mt-10"
            >
              <div className="w-1/3 input-group relative">
                <span>
                  <Icon icon="mdi:lock" width="35" height="35" />
                </span>
                {showPassword ? (
                  <Icon
                    icon="mdi:eye-off"
                    className="absolute top-1 right-2 z-10"
                    width="35"
                    height="35"
                    onClick={showingPassword}
                  />
                ) : (
                  <Icon
                    icon="mdi:eye"
                    className="absolute top-1 right-2 z-10"
                    width="35"
                    height="35"
                    onClick={showingPassword}
                  />
                )}
                <input
                  name="currentPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Current password"
                  className="input input-bordered input-primary w-full"
                  {...register("currentPassword", { required: true })}
                />
              </div>
              {errors.currentPassword && (
                <span className="text-error mt-2">
                  {errors.currentPassword?.message}
                </span>
              )}
              <div className="w-1/3 input-group relative">
                <span>
                  <Icon icon="mdi:lock" width="35" height="35" />
                </span>
                {showPassword ? (
                  <Icon
                    icon="mdi:eye-off"
                    className="absolute top-1 right-2 z-10"
                    width="35"
                    height="35"
                    onClick={showingPassword}
                  />
                ) : (
                  <Icon
                    icon="mdi:eye"
                    className="absolute top-1 right-2 z-10"
                    width="35"
                    height="35"
                    onClick={showingPassword}
                  />
                )}
                <input
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="New password"
                  className="input input-bordered input-primary w-full"
                  {...register("newPassword", { required: true })}
                />
              </div>
              {errors.newPassword && (
                <span className="text-error mt-2">
                  {errors.newPassword?.message}
                </span>
              )}
              <div className="w-1/3 input-group relative">
                <span>
                  <Icon icon="mdi:lock" width="35" height="35" />
                </span>
                {showPassword ? (
                  <Icon
                    icon="mdi:eye-off"
                    className="absolute top-1 right-2 z-10"
                    width="35"
                    height="35"
                    onClick={showingPassword}
                  />
                ) : (
                  <Icon
                    icon="mdi:eye"
                    className="absolute top-1 right-2 z-10"
                    width="35"
                    height="35"
                    onClick={showingPassword}
                  />
                )}
                <input
                  name="confirmNewPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Repeat your password"
                  className="input input-bordered input-primary w-full"
                  {...register("confirmNewPassword", { required: true })}
                />
              </div>
              {errors.confirmNewPassword && (
                <span className="text-error mt-2">
                  {errors.confirmNewPassword?.message}
                </span>
              )}
              <button
                type="submit"
                className="btn btn-primary w-1/3"
                disabled={!isDirty || !isValid}
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function ChangePassword() {
  return (
    <>
      <Head>
        <title>Change Password: MexL Pay</title>
        <meta name="description" content="Change Password MexL Pay" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarHome />
      <ChangePasswordContent />
      <FooterHome />
    </>
  );
}
