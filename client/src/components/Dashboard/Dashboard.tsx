"use client";
import React, { useEffect, useState } from "react";
import BoardData from "../../data/board-data.json";
import DashHeader from "./DashHeader";
import { DragDropContext } from "@hello-pangea/dnd";
import {
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "../../../redux/features/apiSlice";
import Loader from "../../utils/Loader/Loader";
import DroppableColumn from "../DroppableColumn";
import { useModal } from "../../hooks/useModal";
import CustomModal from "../../utils/Modal/CustomModal";
import AddTaskForm from "../Task/AddTaskForm";
import { socketId } from "../../utils/socket";

type Props = {};

const Dashboard = (props: Props) => {
  const {
    data: tasks,
    isSuccess,
    isLoading: getTasksLoad,
    refetch,
  } = useGetTasksQuery({});
  const [updateTask, { isSuccess: isTaskUpdated, isError, isLoading }] =
    useUpdateTaskMutation();
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState(BoardData);
  const { open, setOpen } = useModal();
  const [add, setAdd] = useState<boolean>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReady(true);
    }
  }, []);
  useEffect(() => {
    if (isSuccess && tasks) {
      setBoardData(tasks);
    }
  }, [isSuccess, tasks]);
  useEffect(() => {
    if (isError) {
      setOpen(true);
    }
    if (isTaskUpdated) {
      // refetch();
    }
  }, [isTaskUpdated, isError]);

  const onDragEnd = async (result: any) => {
    if (!result.destination) return;
    const { destination, draggableId } = result;
    const taskIndex = boardData.findIndex(
      (task: any) => task._id === draggableId
    );
    if (taskIndex === -1) return;
    const updatedTask = {
      ...boardData[taskIndex],
      status: destination.droppableId,
    };
    const newBoardData = Array.from(boardData);
    newBoardData.splice(taskIndex, 1);
    newBoardData.splice(destination.index, 0, updatedTask);
    setBoardData(newBoardData);
    await updateTask(updatedTask);
    socketId.emit("tasks", {data: "task status updated"})
  };

  useEffect(() => {
   socketId.on("onTaskUpdate", ()=> {
    refetch()
   }) 
   return () => {
    socketId.off();
  };
  })

  if (getTasksLoad) {
    return <Loader />;
  }
  return (
    <div className="p-10 flex flex-col min-h-screen font-Poppins">
      <DashHeader />
      {isLoading && <Loader />}
      {ready && boardData && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-3 gap-4 lg:gap-8 my-5 min-h-[45rem]">
            <DroppableColumn
              droppableId="TODO"
              tasks={boardData}
              title="TODO"
              setAdd={setAdd}
            />
            <DroppableColumn
              droppableId="IN_PROGRESS"
              tasks={boardData}
              title="IN PROGRESS"
            />
            <DroppableColumn
              droppableId="DONE"
              tasks={boardData}
              title="DONE"
            />
          </div>
        </DragDropContext>
      )}
      {add && (
        <CustomModal
          open={add}
          setOpen={setAdd}
          setRoute={() => {}}
          component={AddTaskForm}
        />
      )}
    </div>
  );
};

export default Dashboard;
