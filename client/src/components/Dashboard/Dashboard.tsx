"use client";
import React, { useEffect, useState } from "react";
import BoardData from "../../data/board-data.json";
import DashHeader from "./DashHeader";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { DotsVerticalIcon, PlusCircleIcon } from "@heroicons/react/outline";
import CardItem from "../CardItem";
import { useGetTasksQuery } from "../../../redux/features/apiSlice";
import Loader from "../../utils/Loader";
import DroppableColumn from "../DroppableColumn";

type Props = {};

function createGuidId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const Dashboard = (props: Props) => {
  const {
    data: tasks,
    error,
    isLoading: getTasksLoad,
    refetch,
  } = useGetTasksQuery({});
  // console.log(tasks);
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState(BoardData);
  const [showForm, setShowForm] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReady(true);
    }
  }, []);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceIndex = parseInt(result.source.droppableId);
    const destIndex = parseInt(result.destination.droppableId);

    const newBoardData = [...boardData];
    const [movedItem] = newBoardData[sourceIndex].items.splice(
      result.source.index,
      1
    );
    newBoardData[destIndex].items.splice(
      result.destination.index,
      0,
      movedItem
    );

    setBoardData(newBoardData);
  };

  const onTextAreaKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = e.currentTarget.value;
      if (val.length === 0) {
        setShowForm(false);
      } else {
        const boardId = parseInt(e.currentTarget.dataset.id!);
        const newItem: any = {
          id: createGuidId(),
          title: val,
          priority: 0,
          chat: 0,
          attachment: 0,
          assignees: [],
        };
        const newBoardData = [...boardData];
        newBoardData[boardId].items.push(newItem);
        setBoardData(newBoardData);
        setShowForm(false);
        e.currentTarget.value = "";
      }
    }
  };

  if (getTasksLoad) {
    return <Loader />;
  }
  return (
    <div className="p-10 flex flex-col min-h-screen font-Poppins">
      <DashHeader />
      {ready && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-3 gap-8 my-5">
            <DroppableColumn
              droppableId="TODO"
              tasks={tasks}
              showForm={showForm}
              selectedBoard={selectedBoard}
              setSelectedBoard={setSelectedBoard}
              setShowForm={setShowForm}
              onTextAreaKeyPress={onTextAreaKeyPress}
              title="TODO"
            />
            <DroppableColumn
              droppableId="IN_PROGRESS"
              tasks={tasks}
              showForm={showForm}
              selectedBoard={selectedBoard}
              setSelectedBoard={setSelectedBoard}
              setShowForm={setShowForm}
              onTextAreaKeyPress={onTextAreaKeyPress}
              title="IN PROGRESS"
            />
            <DroppableColumn
              droppableId="DONE"
              tasks={tasks}
              showForm={showForm}
              selectedBoard={selectedBoard}
              setSelectedBoard={setSelectedBoard}
              setShowForm={setShowForm}
              onTextAreaKeyPress={onTextAreaKeyPress}
              title="DONE"
            />
          </div>
        </DragDropContext>
      )}
    </div>
  );
};

export default Dashboard;
