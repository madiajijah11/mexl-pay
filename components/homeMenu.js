import { Icon } from "@iconify-icon/react";
import Link from "next/link";

export default function HomeMenu() {
  return (
    <div className="bg-neutral rounded-box flex flex-col justify-between shadow-xl w-60 p-2">
      <ul className="menu">
        <li className="hover-bordered">
          <Link href="/home">
            <Icon
              icon="material-symbols:space-dashboard-outline-sharp"
              width="40"
              height="40"
            />
            Dashboard
          </Link>
        </li>
        <li className="hover-bordered">
          <Link href="/transfer">
            <Icon
              icon="material-symbols:arrow-upward-rounded"
              width="40"
              height="40"
            />
            Transfer
          </Link>
        </li>
        <li className="hover-bordered">
          <label htmlFor="top-up">
            <Icon icon="ic:baseline-plus" width="40" height="40" />
            Top Up
          </label>
        </li>
        <li className="hover-bordered">
          <Link href="/profile">
            <Icon
              icon="material-symbols:person-outline"
              width="40"
              height="40"
            />
            Profile
          </Link>
        </li>
      </ul>
      <div>
        <ul className="menu">
          <li className="hover-bordered">
            <Link href="#">
              <Icon icon="material-symbols:logout" width="40" height="40" />
              Logout
            </Link>
          </li>
        </ul>
      </div>
      <input type="checkbox" id="top-up" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="top-up"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Top Up</h3>
          <p className="py-4">Enter the amount of money, and click submit</p>
          <input type="text" className="input input-bordered w-full" />
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
