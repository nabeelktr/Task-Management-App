import { ChevronDownIcon, PlusIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import React from 'react'

type Props = {}

const DashHeader = (props: Props) => {
  return (
    <div className="flex flex-initial justify-between">
    <div className="flex items-center">
      <h4 className="text-4xl font-bold text-gray-600">DashBoard</h4>
      <ChevronDownIcon
        className="w-9 h-9 text-gray-500 rounded-full
      p-1 bg-white ml-5 shadow-xl"
      />
    </div>

    <ul className="flex space-x-3">
      <li>
        <Image
          alt=""
          src="https://randomuser.me/api/portraits/men/75.jpg"
          width="36"
          height="36"
          className=" rounded-full bg-cover"
        />
      </li>
      <li>
        <Image
          alt=""
          src="https://randomuser.me/api/portraits/men/76.jpg"
          width="36"
          height="36"
          className=" rounded-full bg-cover"
        />
      </li>
      <li>
        <Image
          alt=""
          src="https://randomuser.me/api/portraits/men/78.jpg"
          width="36"
          height="36"
          className=" rounded-full bg-cover"

        />
      </li>
      <li>
        <button
          className="border border-dashed flex items-center w-9 h-9 border-gray-500 justify-center
          rounded-full"
        >
          <PlusIcon className="w-5 h-5 text-gray-500" />
        </button>
      </li>
    </ul>
  </div>
  )
}

export default DashHeader