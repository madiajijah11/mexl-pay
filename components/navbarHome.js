import Image from "next/image";
import { Icon } from "@iconify-icon/react";

import ProfilePicture from "../images/review.png";

export default function NavbarHome() {
  return (
    <nav className="navbar bg-neutral py-6 px-40 rounded-b-xl shadow-xl">
      <div className="navbar-start">
        <div className="text-secondary font-bold text-2xl btn glass btn-disabled">
          MexL Pay
        </div>
      </div>
      <div className="navbar-end gap-2">
        <div className="w-10 rounded-md">
          <Image src={ProfilePicture} alt="profile" width={50} height={50} />
        </div>
        <div className="mr-5">
          <div className="font-bold">Robert Chandler</div>
          <div>+6282256964453</div>
        </div>
        <Icon icon="ph:bell" width="30" height="30" />
      </div>
    </nav>
  );
}
