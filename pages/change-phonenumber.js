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

const ChangePhoneNumberSchema = Yup.object().shape({
  phoneNumber: Yup.string().required().min(10).max(14),
});

const ChangePasswordContent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(ChangePhoneNumberSchema),
    defaultValues: {
      phoneNumber: "",
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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center gap-5 mt-10"
            >
              <div className="w-1/3 input-group relative">
                <span>
                  <Icon
                    icon="material-symbols:phone-enabled"
                    width="35"
                    height="35"
                  />
                </span>
                <input
                  name="phoneNumber"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="input input-bordered input-primary w-full"
                  {...register("phoneNumber", { required: true })}
                />
              </div>
              {errors.phoneNumber && (
                <span className="text-error mt-2">
                  {errors.phoneNumber?.message}
                </span>
              )}
              <button
                type="submit"
                className="btn btn-primary w-1/3"
                disabled={!isDirty || !isValid}
              >
                Edit Phone Number
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
