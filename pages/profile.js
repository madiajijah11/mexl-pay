import { Icon } from "@iconify-icon/react";
import Head from "next/head";
import NavbarHome from "../components/navbarHome";
import FooterHome from "../components/footerHome";
import Image from "next/image";
import HomeMenu from "../components/homeMenu";
import ProfilePicture from "../images/review.png";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import IsLogin from "../components/IsLogin";
import { logout } from "../redux/reducers/authReducer";
import { axiosInstance } from "../helpers/axios.helper";

const ProfileContent = ({ userInfo }) => {

  const { token } = useSelector((state) => state.auth);

  

  const dispatch = useDispatch();
  return (
    <section>
      <div className="px-40 py-20 flex gap-5">
        <HomeMenu />
        <div className="w-full flex flex-col gap-5 bg-neutral p-10 rounded-box shadow-xl">
          <div className="flex flex-col gap-2 py-5 items-center justify-center">
            {userInfo?.profilePicture ? (
              <Image
                src={userInfo.profilePicture}
                alt="netflix"
                width={80}
                height={80}
              />
            ) : (
              <Image
                src={ProfilePicture}
                alt="netflix"
                width={80}
                height={80}
              />
            )}
            {/* Upload Images */}

            <div className="font-bold text-2xl">
              {userInfo?.firstName} {userInfo?.lastName}
            </div>
            <div>{userInfo?.phoneNumber}</div>
          </div>
          <div className="flex flex-col gap-5 items-center">
            <Link
              href="/personal-information"
              className="flex gap-5 items-center justify-between w-2/5 rounded-box bg-base-100 shadow-xl p-5"
            >
              <div className="font-bold">Personal Information</div>
              <Icon
                icon="material-symbols:arrow-right-alt-rounded"
                width="40"
                height="40"
              />
            </Link>
            <Link
              href="/change-password"
              className="flex gap-5 items-center justify-between w-2/5 rounded-box bg-base-100 shadow-xl p-5"
            >
              <div className="font-bold">Change Password</div>
              <Icon
                icon="material-symbols:arrow-right-alt-rounded"
                width="40"
                height="40"
              />
            </Link>
            <Link
              href="/change-pin"
              className="flex gap-5 items-center justify-between w-2/5 rounded-box bg-base-100 shadow-xl p-5"
            >
              <div className="font-bold">Change PIN</div>
              <Icon
                icon="material-symbols:arrow-right-alt-rounded"
                width="40"
                height="40"
              />
            </Link>
            <button
              onClick={() => dispatch(logout())}
              className="flex gap-5 items-center justify-between w-2/5 rounded-box bg-base-100 shadow-xl p-5"
            >
              <div className="font-bold">Logout</div>
              <Icon icon="material-symbols:logout" width="40" height="40" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

function Profile() {
  const { userInfo } = useSelector((state) => state.profile);
  return (
    <>
      <Head>
        <title>Profile: MexL Pay</title>
        <meta name="description" content="Profile MexL Pay" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarHome />
      <ProfileContent userInfo={userInfo} />
      <FooterHome />
    </>
  );
}

export default IsLogin(Profile);
