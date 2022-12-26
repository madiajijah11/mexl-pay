import Head from "next/head";
import NavbarHome from "../components/navbarHome";
import FooterHome from "../components/footerHome";
import HomeMenu from "../components/homeMenu";
import Link from "next/link";

const PersonalInformationContent = () => (
  <section>
    <div className="px-40 py-20 flex gap-5">
      <HomeMenu />
      <div className="w-full flex flex-col gap-5 bg-neutral p-10 rounded-box shadow-xl">
        <div className="flex flex-col gap-10 py-5">
          <div className="font-bold">Personal Information</div>
          <p className="w-1/3">
            We got your personal information from the sign up process. If you
            want to make changes on your information, contact our support.
          </p>
          <div className="flex flex-col gap-5 mt-10">
            <div className="flex flex-col rounded-box bg-base-100 shadow-xl p-5">
              <p>First Name</p>
              <div className="font-bold text-xl">Robert</div>
            </div>
            <div className="flex flex-col rounded-box bg-base-100 shadow-xl p-5">
              <p>Last Name</p>
              <div className="font-bold text-xl">Chandler</div>
            </div>
            <div className="flex flex-col rounded-box bg-base-100 shadow-xl p-5">
              <p>Verified E-mail</p>
              <div className="font-bold text-xl">robertchandler@mail.com</div>
            </div>
            <div className="flex gap-5 items-center justify-between rounded-box bg-base-100 shadow-xl p-5">
              <div>
                <p>Phone Number</p>
                <div className="font-bold text-xl">+6282256964453</div>
              </div>
              <Link href="/change-phonenumber" className="text-secondary">
                Manage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default function PersonalInformation() {
  return (
    <>
      <Head>
        <title>Profile: MexL Pay</title>
        <meta name="description" content="Profile MexL Pay" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarHome />
      <PersonalInformationContent />
      <FooterHome />
    </>
  );
}
