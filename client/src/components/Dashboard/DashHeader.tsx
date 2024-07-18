import { ChevronDownIcon, PlusIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import React from 'react'

type Props = {}

const DashHeader = (props: Props) => {
  return (
    <div className="flex flex-initial justify-between">
    <div className="flex items-center">
      <h4 className="text-2xl font-semibold text-gray-800">DashBoard</h4>
      <ChevronDownIcon
        className="w-6 h-6 text-gray-500 rounded-full
      p-1 bg-white ml-5 shadow-xl"
      />
    </div>
  </div>
  )
}

export default DashHeader