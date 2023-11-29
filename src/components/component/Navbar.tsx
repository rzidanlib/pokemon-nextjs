"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav className="bg-white py-[20px]">
      <div className="max-w-screen-xl flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <img src="/img/pokeball.png" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Journeys
          </span>
        </Link>

        <div className="flex">
          <ul className="flex items-center font-medium text-lg mr-2">
            <li className="border-2 border-white hover:border-blue-700 cursor-pointer">
              <Link href="/" className="px-3 text-blue-700">
                Home
              </Link>
            </li>
            <li className="border-2 border-white hover:border-blue-700 cursor-pointer">
              <Link href="/community" className="px-3 text-blue-700">
                Community
              </Link>
            </li>
            <li className="border-2 border-white hover:border-blue-700 cursor-pointer">
              <Link href="/pokemon" className="px-3 text-blue-700">
                Pokemon
              </Link>
            </li>
          </ul>

          <div className="relative">
            <div className="flex flex-col items-end">
              <div>
                <button
                  type="button"
                  // onClick={handleToggleDropdown}
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
                className={`absolute hidden mt-10 text-base z-50 list-none bg-white border-2 rounded shadow-2xl`}
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

  // return (
  //   <nav className="bg-white py-[20px]">
  //     <div className="max-w-screen-xl flex items-center justify-between">
  //       <Link href="/" className="flex items-center space-x-3">
  //         <Logo />
  //         <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
  //           Journeys
  //         </span>
  //       </Link>

  //       <div>
  //         <Link
  //           href="/login"
  //           className="p-2 text-blue-500 hover:text-blue-700 mr-2"
  //         >
  //           Sign In
  //         </Link>

  //         <Link
  //           href="/register"
  //           className="p-2 px-10 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
  //         >
  //           Sign Up
  //         </Link>
  //       </div>
  //     </div>
  //   </nav>
  // );
}
