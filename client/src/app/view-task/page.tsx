"use client";
import React from "react";
import Protected from "@/hooks/useProtected";
import { useGetTaskQuery } from "../../../redux/features/apiSlice";
import { useSearchParams } from "next/navigation";


const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id")
  const { data: task, isLoading: getTasksLoad } = useGetTaskQuery({
    id,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Pending":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (getTasksLoad) return <div className="text-center my-10">Loading...</div>;

  return (
    <Protected>
      <div className="max-w-xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md mt-32 font-Poppins">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
          {task?.title}
        </h1>
        <div className="mb-4 text-gray-700">
          <p className="text-lg">{task?.description}</p>
        </div>
        <div className="mb-4">
          <span className="font-bold text-gray-700">Status:</span>
          <span
            className={`ml-2 px-2 py-1 rounded-full ${getStatusColor(
              task?.status
            )}`}
          >
            {task?.status}
          </span>
        </div>
        <div className="mb-4">
          <span className="font-bold text-gray-700">Priority:</span>
          <span className="ml-2 px-2 py-1 rounded-full bg-blue-100 text-blue-800">
            {task?.priority}
          </span>
        </div>
        <div className="mb-4">
          <span className="font-bold text-gray-700">Assignee:</span>
          <span className="ml-2 text-gray-800">{task?.assignee}</span>
        </div>
        <div className="mb-4">
          <span className="font-bold text-gray-700">Due Date:</span>
          <span className="ml-2 text-gray-800">
            {task?.dueDate
              ? new Date(task?.dueDate).toLocaleDateString()
              : "N/A"}
          </span>
        </div>
      </div>
    </Protected>
  );
};

export default Page;
