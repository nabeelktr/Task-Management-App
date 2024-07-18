import { AtSymbolIcon, BellIcon, SearchIcon } from "@heroicons/react/outline";
import Image from "next/image";
import React from "react";

type Props = {};

const TopBar = (props: Props) => {
  return (
    <div
      className="h-[4.3rem] fixed bg-gradient-to-r from-gray-800
        to-blue-500 w-full flex items-center justify-between px-[12%] z-[99] shadow-xl"
    >
      <div className="flex px-5 items-center text-2xl font-Poppins font-semibold text-white">
        <h5>TaskTrackr</h5>
      </div>
      <div className="flex space-x-6">
        <AtSymbolIcon className="w-7 h-7 text-white" />
        <BellIcon className="w-7 h-7 text-white" />
        <div className="flex items-center text-white">
          <Image
            src="https://randomuser.me/api/portraits/men/75.jpg"
            width="36"
            height="36"
            alt=""
            className=" rounded-full bg-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
