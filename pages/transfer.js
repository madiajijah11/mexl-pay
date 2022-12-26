import { Icon } from "@iconify-icon/react";
import Head from "next/head";
import NavbarHome from "../components/navbarHome";
import FooterHome from "../components/footerHome";
import Image from "next/image";
import HomeMenu from "../components/homeMenu";
import ProfilePicture from "../images/review.png";

const ReceiverList = () => (
  <section>
    <div className="px-40 py-20 flex gap-5">
      <HomeMenu />
      <div className="w-full flex flex-col gap-5 bg-neutral p-10 rounded-box shadow-xl">
        <div className="font-bold">Search Receiver</div>
        <div className="input-group bg-base-100 flex items-center rounded-box px-4 py-2 gap-2">
          <Icon icon="ic:baseline-search" width="40" height="40" />
          <input
            type="text"
            className="input w-full"
            placeholder="Search Receiver"
          />
        </div>
        <div className="flex gap-5 items-center rounded-box bg-base-100 shadow-xl p-5">
          <div className="flex gap-4">
            <Image src={ProfilePicture} alt="netflix" width={70} height={70} />
            <div className="flex flex-col justify-center gap-2">
              <div className="font-bold">Samuel Suhi</div>
              <div>+6282256964453</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default function Transfer() {
  return (
    <>
      <Head>
        <title>Transfer: MexL Pay</title>
        <meta name="description" content="Transfer MexL Pay" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarHome />
      <ReceiverList />
      <FooterHome />
    </>
  );
}
