import { Icon } from "@iconify-icon/react";
import Head from "next/head";
import NavbarHome from "../components/navbarHome";
import FooterHome from "../components/footerHome";
import Image from "next/image";
import HomeMenu from "../components/homeMenu";
import ProfilePicture from "../images/review.png";
import Link from "next/link";

const ProfileContent = () => (
  <section>
    <div className="px-40 py-20 flex gap-5">
      <HomeMenu />
      <div className="w-full flex flex-col gap-5 bg-neutral p-10 rounded-box shadow-xl">
        <div className="flex flex-col gap-2 py-5 items-center justify-center">
          <Image src={ProfilePicture} alt="netflix" width={80} height={80} />
          <div className="font-bold text-2xl">Samuel Suhi</div>
          <div>+6282256964453</div>
        </div>
        <div className="flex flex-col gap-5 items-center">
          <Link href="/personal-information" className="flex gap-5 items-center justify-between w-2/5 rounded-box bg-base-100 shadow-xl p-5">
            <div className="font-bold">Personal Information</div>
            <Icon
              icon="material-symbols:arrow-right-alt-rounded"
              width="40"
              height="40"
            />
          </Link>
          <Link href="/change-password" className="flex gap-5 items-center justify-between w-2/5 rounded-box bg-base-100 shadow-xl p-5">
            <div className="font-bold">Change Password</div>
            <Icon
              icon="material-symbols:arrow-right-alt-rounded"
              width="40"
              height="40"
            />
          </Link>
          <Link href="/change-pin" className="flex gap-5 items-center justify-between w-2/5 rounded-box bg-base-100 shadow-xl p-5">
            <div className="font-bold">Change PIN</div>
            <Icon
              icon="material-symbols:arrow-right-alt-rounded"
              width="40"
              height="40"
            />
          </Link>
          <div className="flex gap-5 items-center justify-between w-2/5 rounded-box bg-base-100 shadow-xl p-5">
            <div className="font-bold">Logout</div>
            <Icon icon="material-symbols:logout" width="40" height="40" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default function Profile() {
  return (
    <>
      <Head>
        <title>Profile: MexL Pay</title>
        <meta name="description" content="Profile MexL Pay" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarHome />
      <ProfileContent />
      <FooterHome />
    </>
  );
}
