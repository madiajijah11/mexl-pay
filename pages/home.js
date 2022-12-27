import { Icon } from "@iconify-icon/react";
import Link from "next/link";
import Head from "next/head";
import NavbarHome from "../components/navbarHome";
import FooterHome from "../components/footerHome";
import Graph from "../images/expenses.png";
import Image from "next/image";
import Netflix from "../images/netflix.png";
import HomeMenu from "../components/homeMenu";
import IsLogin from "../components/IsLogin";

const HomeContent = () => (
  <section>
    <div className="px-40 py-20 flex gap-5">
      <HomeMenu />
      <div className="w-full flex flex-col gap-5">
        <div className="bg-primary flex justify-between p-10 rounded-box shadow-xl">
          <div className="flex flex-col justify-center gap-2">
            <div>Balance</div>
            <div className="font-bold text-4xl">Rp1.000.000</div>
            <div className="font-semibold">+6282256964453</div>
          </div>
          <div className="flex flex-col gap-2">
            <button className="btn btn-secondary glass">
              <Icon
                icon="material-symbols:arrow-upward-rounded"
                width="40"
                height="40"
              />
              Transfer
            </button>
            <button className="btn btn-secondary glass">
              <Icon icon="ic:baseline-plus" width="40" height="40" /> Top Up
            </button>
          </div>
        </div>
        <div className="flex gap-5 w-full">
          <div className="bg-neutral flex justify-center items-center rounded-box shadow-xl p-10 w-2/3">
            <Image src={Graph} alt="graph" width={400} height={400} />
          </div>
          <div className="bg-neutral rounded-box shadow-xl p-10 w-1/3">
            <div className="flex justify-between mb-10">
              <div className="font-bold">Transaction History</div>
              <div className="font-semibold">
                <Link href="/history">See all</Link>
              </div>
            </div>
            <div className="flex flex-col gap-5 w-full">
              <div className="flex gap-5 justify-between items-center">
                <div className="flex gap-4">
                  <Image src={Netflix} alt="netflix" width={70} height={70} />
                  <div className="flex flex-col justify-center gap-2">
                    <div className="font-bold">Netflix</div>
                    <div>Transfer</div>
                  </div>
                </div>
                <div className="font-bold text-red-700">-Rp149.000</div>
              </div>
              <div className="flex gap-5 justify-between items-center">
                <div className="flex gap-4">
                  <Image src={Netflix} alt="netflix" width={70} height={70} />
                  <div className="flex flex-col justify-center gap-2">
                    <div className="font-bold">Netflix</div>
                    <div>Transfer</div>
                  </div>
                </div>
                <div className="font-bold text-red-700">-Rp149.000</div>
              </div>
              <div className="flex gap-5 justify-between items-center">
                <div className="flex gap-4">
                  <Image src={Netflix} alt="netflix" width={70} height={70} />
                  <div className="flex flex-col justify-center gap-2">
                    <div className="font-bold">Netflix</div>
                    <div>Transfer</div>
                  </div>
                </div>
                <div className="font-bold text-red-700">-Rp149.000</div>
              </div>
              <div className="flex gap-5 justify-between items-center">
                <div className="flex gap-4">
                  <Image src={Netflix} alt="netflix" width={70} height={70} />
                  <div className="flex flex-col justify-center gap-2">
                    <div className="font-bold">Netflix</div>
                    <div>Transfer</div>
                  </div>
                </div>
                <div className="font-bold text-red-700">-Rp149.000</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

function Home() {
  return (
    <>
      <Head>
        <title>Home: MexL Pay</title>
        <meta name="description" content="Home MexL Pay" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarHome />
      <HomeContent />
      <FooterHome />
    </>
  );
}

export default IsLogin(Home);
