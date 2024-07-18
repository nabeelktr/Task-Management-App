import React from 'react'
import { ArrowCircleLeftIcon, ArrowLeftIcon, ArrowNarrowLeftIcon, CalendarIcon, ChartSquareBarIcon, CogIcon, ServerIcon, UserGroupIcon } from "@heroicons/react/outline"
type Props = {}

const SideBar = (props: Props) => {
  return (
    <div className="fixed inset-y-0 left-0 bg-white w-28 ">
            <h1 className="flex items-center justify-center text-2xl
            h-16 bg-purple-600 text-white font-bold"></h1>

            <ul className="flex flex-col h-full mt-2 text-sm uppercase">
            
                <li className="flex justify-center pl-2 flex-col
                py-7 border-l-4 border-purple-500 text-purple-500
                font-bold">
                    <ServerIcon className="w-7 h-7 text-purple-500"/>
                    Dashboard
                </li>
              

                <li className="flex justify-center items-center
                py-7 text-gray-500 mt-auto mb-16">
                    <ArrowCircleLeftIcon className="w-7 h-7"/>
                    Logout
                </li>
            </ul>
        </div>
  )
}

export default SideBar