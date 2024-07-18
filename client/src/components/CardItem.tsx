import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import {
  ChatAlt2Icon,
  ClockIcon,
  EyeIcon,
  PaperClipIcon,
  UserAddIcon,
} from "@heroicons/react/outline";
import { formatTimeLeft } from "@/utils/formatTimeLeft";

type Assignee = {
  avt: string;
};

type Data = {
  _id: string;
  priority: string;
  title: string;
  description: string;
  attachment: number;
  assignee: string;
  dueDate: string;
};

type Props = {
  index: number;
  data: Data;
};

const CardItem = ({ index, data }: Props) => {
  return (
    <div className="bg-white rounded-md p-3 m-3 mt-3 mb-3">
      <div className="flex justify-between">
        <label
          className={`bg-gradient-to-r
                px-2 py-1 rounded text-white text-xs
                ${
                  data.priority === "LOW"
                    ? "from-blue-600 to-blue-400"
                    : data.priority === "MEDIUM"
                    ? "from-green-600 to-green-400"
                    : "from-red-600 to-red-400"
                }
                `}
        >
          {data.priority} Priority
        </label>
        <EyeIcon className="w-6 h-6 hover:cursor-pointer hover:bg-gray-200 rounded-lg p-1" />
      </div>
      <h5 className="text-md mt-2 text-md leading-6">{data.title}</h5>
      <h3 className="text-md  text-xs mb-3 text-gray-600">
        {data.description}
      </h3>
      <div className="flex justify-between">
        <div className="flex space-x-2 items-center">
          <span className="flex space-x-1 items-center text-xs text-gray-500">
            <ClockIcon className="w-4 h-4 " />
            <span>{formatTimeLeft(data.dueDate)}</span>
          </span>
        </div>
        <div className="flex space-x-2 items-center">
          <span className="flex space-x-1 items-center text-xs text-gray-500">
            <span>{data.assignee}</span>
            <UserAddIcon className="w-4 h-4 " />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
