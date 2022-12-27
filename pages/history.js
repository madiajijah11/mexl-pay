import Head from "next/head";
import NavbarHome from "../components/navbarHome";
import FooterHome from "../components/footerHome";
import Image from "next/image";
import Netflix from "../images/netflix.png";
import HomeMenu from "../components/homeMenu";
import IsLogin from "../components/isLogin";

const HistoryContent = () => (
  <section>
    <div className="px-40 py-20 flex gap-5">
      <HomeMenu />
      <div className="w-full flex flex-col gap-5 bg-neutral p-10 rounded-box shadow-xl">
        <div className="flex justify-between">
          <div className="font-bold">Transaction History</div>
          <div>
            <select className="select w-full max-w-xs">
              <option disabled selected>
                -- Select Filter --
              </option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-5">
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
  </section>
);

function History() {
  return (
    <>
      <Head>
        <title>History: MexL Pay</title>
        <meta name="description" content="History Transaction MexL Pay" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarHome />
      <HistoryContent />
      <FooterHome />
    </>
  );
}

export default IsLogin(History);
