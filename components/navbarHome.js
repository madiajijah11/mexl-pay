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
        <ul className="menu menu-horizontal px-1">
          <li tabIndex={0}>
            <a>
              <Icon icon="ph:bell" width="30" height="30" />
            </a>
            <ul className="p-2 bg-neutral gap-2 right-0 mt-7 z-10">
              <li>
                <a className="flex flex-row bg-base-100 gap-2">
                  <Icon
                    icon="material-symbols:arrow-downward-rounded"
                    width="40"
                    height="40"
                    style={{ color: "green" }}
                  />
                  <div>
                    <div className="text-sm">Accept from Joshua Lee</div>
                    <div className="font-bold">Rp220.000</div>
                  </div>
                </a>
              </li>
              <li>
                <a className="flex flex-row bg-base-100 gap-2">
                  <Icon
                    icon="material-symbols:arrow-upward-rounded"
                    width="40"
                    height="40"
                    style={{ color: "red" }}
                  />
                  <div>
                    <div className="text-sm">Transfer to Deni</div>
                    <div className="font-bold">Rp149.000</div>
                  </div>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
