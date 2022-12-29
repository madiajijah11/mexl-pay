import { Icon } from "@iconify-icon/react";
import Head from "next/head";
import NavbarHome from "../components/navbarHome";
import FooterHome from "../components/footerHome";
import Image from "next/image";
import HomeMenu from "../components/homeMenu";
import ProfilePicture from "../images/review.png";
import IsLogin from "../components/isLogin";
import { useSelector } from "react-redux";

const StatusContent = () => {
  const { userInfo } = useSelector((state) => state.profile);
  const { amount, recipientId, notes } = useSelector(
    (state) => state.transaction
  );

  

  return (
    <section>
      <div className="px-40 py-20 flex gap-5">
        <HomeMenu />
        <div className="w-full flex flex-col gap-5 bg-neutral p-10 rounded-box shadow-xl">
          <div className="flex flex-col gap-2 py-5 items-center justify-center">
            <Icon
              icon="icon-park-solid:check-one"
              width="70"
              height="70"
              style={{ color: "green" }}
            />
            <div className="font-bold text-xl">Transfer Success</div>
          </div>
          <div className="flex gap-5 items-center rounded-box bg-base-100 shadow-xl p-5">
            <div className="flex flex-col justify-center gap-2">
              <div>Amount</div>
              <div className="font-bold text-xl">
                Rp{Number(amount).toLocaleString("id")}
              </div>
            </div>
          </div>
          <div className="flex gap-5 items-center rounded-box bg-base-100 shadow-xl p-5">
            <div className="flex flex-col justify-center gap-2">
              <div>Balance Left</div>
              <div className="font-bold text-xl">
                Rp{Number(userInfo?.balance).toLocaleString("id")}
              </div>
            </div>
          </div>
          <div className="flex gap-5 items-center rounded-box bg-base-100 shadow-xl p-5">
            <div className="flex flex-col justify-center gap-2">
              <div>Date & Time</div>
              <div className="font-bold text-xl">May 11, 2020 - 12.20</div>
            </div>
          </div>
          <div className="flex gap-5 items-center rounded-box bg-base-100 shadow-xl p-5">
            <div className="flex flex-col justify-center gap-2">
              <div>Notes</div>
              <div className="font-bold text-xl">{notes}</div>
            </div>
          </div>
          <div className="font-bold">Transfer To</div>
          <div className="flex gap-5 items-center rounded-box bg-base-100 shadow-xl p-5">
            <div className="flex gap-4">
              <Image
                src={ProfilePicture}
                alt="netflix"
                width={70}
                height={70}
                className="rounded-lg w-[70px] h-[70px]"
              />
              <div className="flex flex-col justify-center gap-2">
                <div className="font-bold">Samuel Suhi</div>
                <div>+6282256964453</div>
              </div>
            </div>
          </div>
          <div className="w-full justify-end flex gap-2">
            <button className="btn btn-outline btn-primary">
              <Icon
                icon="material-symbols:download-rounded"
                width="40"
                height="40"
              />
              Download PDF
            </button>
            <button className="btn btn-primary">Back to Home</button>
          </div>
        </div>
      </div>
    </section>
  );
};

function Status() {
  return (
    <>
      <Head>
        <title>Status: MexL Pay</title>
        <meta name="description" content="Transfer MexL Pay" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarHome />
      <StatusContent />
      <FooterHome />
    </>
  );
}

export default IsLogin(Status);
