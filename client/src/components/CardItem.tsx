"use client";
import React, { useEffect, useState } from "react";
import {
  ClockIcon,
  EyeIcon,
  PencilAltIcon,
  TrashIcon,
  UserAddIcon,
} from "@heroicons/react/outline";
import { formatTimeLeft } from "../utils/formatTimeLeft";
import CustomDeleteModal from "../utils/Modal/CustomDeleteModal";
import { useDeleteTaskMutation } from "../../redux/features/apiSlice";
import CustomModal from "@/utils/Modal/CustomModal";
import EditTaskForm from "./Task/EditTaskForm";
import Link from "next/link";
import { socketId } from "../utils/socket";

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
  const [open, setOpen] = useState<boolean>();
  const [edit, setEdit] = useState<boolean>(false);
  const [deleteTask, { isSuccess }] = useDeleteTaskMutation();
  const handleDelete = async () => {
    await deleteTask(data);
    socketId.emit("tasks", {data: "task deleted"})
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
    }
  }, [isSuccess]);
  return (
    <>
      <div className="bg-white rounded-md p-3 m-3 mt-3 mb-3">
        <div className="flex justify-between">
          <label
            className={`bg-gradient-to-r
                px-2 py-1 rounded text-white text-xs
                ${
                  data?.priority === "LOW"
                    ? "from-blue-600 to-blue-400"
                    : data?.priority === "MEDIUM"
                    ? "from-green-600 to-green-400"
                    : "from-red-600 to-red-400"
                }
                `}
          >
            {data.priority} Priority
          </label>
          <div className="flex gap-1">
            <PencilAltIcon
              className="w-6 h-6 hover:cursor-pointer hover:bg-gray-200 rounded-lg p-1"
              onClick={() => setEdit(true)}
            />
            <TrashIcon
              className="w-6 h-6 hover:cursor-pointer hover:bg-gray-200 rounded-lg p-1"
              onClick={() => setOpen(true)}
            />
            <Link href={`/view-task/?id=${data?._id}`} passHref>
                <EyeIcon className="w-6 h-6 hover:cursor-pointer hover:bg-gray-200 rounded-lg p-1" />
            </Link>
          </div>
        </div>
        <h5 className="text-md mt-2 text-md leading-6">{data?.title}</h5>
        <h3 className="text-md  text-xs mb-3 text-gray-600">
          {data?.description}
        </h3>
        <div className="flex justify-between">
          <div className="flex space-x-2 items-center">
            <span className="flex space-x-1 items-center text-xs text-gray-500">
              <ClockIcon className="w-4 h-4 " />
              <span>{formatTimeLeft(data?.dueDate)}</span>
            </span>
          </div>
          <div className="flex space-x-2 items-center">
            <span className="flex space-x-1 items-center text-xs text-gray-500">
              <span>{data?.assignee}</span>
              <UserAddIcon className="w-4 h-4 " />
            </span>
          </div>
        </div>
      </div>
      {open && (
        <CustomDeleteModal
          open={open}
          setOpen={setOpen}
          handleFunction={handleDelete}
          text="Are you sure you want to delete this task ?"
        />
      )}
      {edit && (
        <CustomModal
          open={edit}
          setOpen={setEdit}
          setRoute={() => {}}
          component={EditTaskForm}
          tasks={data}
        />
      )}
    </>
  );
};

export default CardItem;
