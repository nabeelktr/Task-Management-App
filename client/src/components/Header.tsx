"use client";
import Link from "next/link";
import React, { FC, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Image from "next/image";

type Props = {};

const Header: FC<Props> = () => {
  const [active, setActive] = useState(false);
  const [openSidebar, setopenSidebar] = useState(false);

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setopenSidebar(false);
    }
  };

  return (
    <div className="relative z-[9999] w-full px-[12%] shadow-md bg-gray-100 ">
      <div
        className={`${
          active
            ? "   fixed left-0 top-0 z-[80] h-[90px] w-full  shadow-xl transition duration-500"
            : "z-[80]  h-[65px] w-full 800px:h-[90px] "
        }`}
      >
        <div className="m-auto h-full 800px:py-2 ">
          <div className="flex h-[100px] w-full items-center justify-between ">
            <div className="flex">
              <Link
                href="/"
                className="font-BebasNeue mr-6 text-black font-[900]"
              >
                <p className=" md:text-[2vw] text-[5vw] ">
                  Task Manager
                </p>
              </Link>
            </div>

            <div className="flex items-center">
              {/* for mobile */}
              <div className="800px:hidden ">
                <HiOutlineMenuAlt3
                  size={25}
                  className="mb-6 cursor-pointer text-black "
                  onClick={() => setopenSidebar(true)}
                />
              </div>
              {/* for desktop */}
              {
                <Link href={"/#"}>
                  <Image
                    src="/assets/user.png"
                    alt="usericon"
                    width={35}
                    height={35}
                    className="ml-5 hidden cursor-pointer rounded-full 800px:block"
                  />
                </Link>
              }
            </div>
          </div>
        </div>
        {/* sidebar for mobile */}
        {openSidebar && (
          <div
            className="fixed left-0 top-0 z-[99999] h-screen w-full bg-[#00000024] dark:bg-[unset] "
            onClick={handleClose}
            id="screen"
          >
            <div className="dark:bg-slate-900 fixed right-0 top-0 z-[99999999] h-screen w-[70%] bg-white dark:bg-opacity-90">
              <br />
              <br />
              <p className="px-2 pl-5 text-[12px] text-black dark:text-white">
                Copyright @ 2024 ReserVite
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
