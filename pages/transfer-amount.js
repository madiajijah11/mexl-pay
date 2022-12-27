import Head from "next/head";
import NavbarHome from "../components/navbarHome";
import FooterHome from "../components/footerHome";
import Image from "next/image";
import HomeMenu from "../components/homeMenu";
import ProfilePicture from "../images/review.png";
import IsLogin from "../components/IsLogin";

const Transfer = () => (
  <section>
    <div className="px-40 py-20 flex gap-5">
      <HomeMenu />
      <div className="w-full flex flex-col gap-5 bg-neutral p-10 rounded-box shadow-xl">
        <div className="font-bold">Transfer Money</div>
        <div className="flex gap-5 items-center rounded-box bg-base-100 shadow-xl p-5">
          <div className="flex gap-4">
            <Image src={ProfilePicture} alt="netflix" width={70} height={70} />
            <div className="flex flex-col justify-center gap-2">
              <div className="font-bold">Samuel Suhi</div>
              <div>+6282256964453</div>
            </div>
          </div>
        </div>
        <p>
          Type the amount you want to transfer and then press continue to the
          next steps.
        </p>
        <div className="flex flex-col items-center justify-center gap-5">
          <input
            type="text"
            className="input input-lg text-center"
            placeholder="0.00"
          />
          <div className="font-bold">Rp120.000 Available</div>
          <textarea
            type="text"
            className="input"
            placeholder="Add some notes"
            cols={50}
          />
        </div>
        <div className="w-full justify-end flex">
          <button className="btn btn-primary">Continue</button>
        </div>
      </div>
    </div>
  </section>
);

function TransferAmount() {
  return (
    <>
      <Head>
        <title>Transfer: MexL Pay</title>
        <meta name="description" content="Transfer MexL Pay" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarHome />
      <Transfer />
      <FooterHome />
    </>
  );
}

export default IsLogin(TransferAmount);
