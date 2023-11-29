import Logo from "@/components/component/Logo";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [toggleDropdown, setToggleDropdown] = useState(true);

  const handleToggleDropdown = () => {
    setToggleDropdown((prevState) => !prevState);
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <Link href="/" className="flex ms-2 md:me-24">
              <Logo />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                Dashboard
              </span>
            </Link>
          </div>
          <div className="relative">
            <div className="flex flex-col items-end">
              <div>
                <button
                  type="button"
                  onClick={handleToggleDropdown}
                  className="flex text-sm focus:ring-4 focus:ring-gray-100 rounded-full"
                >
                  <img
                    className="w-10 rounded-full"
                    src="/img/user.png"
                    alt="user photo"
                  />
                </button>
              </div>
              <div
                className={`absolute ${
                  toggleDropdown ? "hidden" : ""
                } mt-10 text-base z-50 list-none bg-white border-2 rounded shadow-2xl`}
              >
                <ul className="py-1">
                  <Link href="/dashboard">
                    <li className="px-10 py-2 hover:bg-gray-100 border-b-2 border-gray-100 justify-start items-center cursor-pointer">
                      Dashboard
                    </li>
                  </Link>
                  <li
                    onClick={() => signOut()}
                    className="px-10 py-2 hover:bg-gray-100 flex justify-start items-center cursor-pointer"
                  >
                    <img
                      src="/img/power-off.png"
                      alt="logout"
                      className="h-5 flex items-start"
                    />
                    <p className="text-gray-700">Logout</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
