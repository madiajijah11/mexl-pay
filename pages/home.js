import { Icon } from "@iconify-icon/react";
import Link from "next/link";
import Head from "next/head";
import NavbarHome from "../components/navbarHome";
import FooterHome from "../components/footerHome";
import Graph from "../images/expenses.png";
import Image from "next/image";
import Netflix from "../images/netflix.png";
import HomeMenu from "../components/homeMenu";
import IsLogin from "../components/isLogin";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../redux/actions/profileAction";
import { axiosInstance } from "../helpers/axios.helper";

const HomeContent = ({ userInfo, transactions }, isError, isLoading) => {
  const imgURL = process.env.NEXT_PUBLIC_IMAGE_URL;
  return (
    <section>
      <div className="px-40 py-20 flex gap-5">
        <HomeMenu />
        <div className="w-full flex flex-col gap-5">
          <div className="bg-primary flex justify-between p-10 rounded-box shadow-xl">
            <div className="flex flex-col justify-center gap-2">
              <div>Balance</div>
              <div className="font-bold text-4xl">Rp.{userInfo?.balance}</div>
              <div className="font-semibold">{userInfo?.phoneNumber}</div>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/transfer" className="btn btn-secondary glass">
                <Icon
                  icon="material-symbols:arrow-upward-rounded"
                  width="40"
                  height="40"
                />
                Transfer
              </Link>
              <label htmlFor="top-up" className="btn btn-secondary glass">
                <Icon icon="ic:baseline-plus" width="40" height="40" />
                Top Up
              </label>
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
                {isLoading && (
                  <progress className="progress progress-primary w-56"></progress>
                )}
                {transactions?.map((transaction) => (
                  <div
                    className="flex gap-5 justify-between items-center"
                    key={transaction.id}
                  >
                    <div className="flex gap-4">
                      {transaction?.senderPicture ? (
                        <Image
                          src={imgURL + transaction?.senderPicture}
                          alt="ProfilePicture"
                          width={70}
                          height={70}
                        />
                      ) : (
                        <Image
                          src={Netflix}
                          alt="ProfilePicture"
                          width={70}
                          height={70}
                        />
                      )}
                      <div className="flex flex-col justify-center gap-2">
                        <div className="font-bold">{}</div>
                        <div>{transaction.notes}</div>
                      </div>
                    </div>
                    <div className="font-bold text-red-700">
                      {transaction.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function Home() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.profile);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const getTransactionHistory = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/transactions?page=1&limit=5", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(response.data.results);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getProfile());
    getTransactionHistory();
  }, []);

  return (
    <>
      <Head>
        <title>Home: MexL Pay</title>
        <meta name="description" content="Home MexL Pay" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarHome />
      <HomeContent
        userInfo={userInfo}
        transactions={transactions}
        isError={isError}
        isLoading={isLoading}
      />
      <FooterHome />
    </>
  );
}

export default IsLogin(Home);
