"use client"
import React, { useEffect, useState } from "react";
import BoardData from "../../data/board-data.json";
import DashHeader from "./DashHeader";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { DotsVerticalIcon, PlusCircleIcon } from "@heroicons/react/outline";
import CardItem from "../CardItem";

type Props = {};

function createGuidId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const Dashboard = (props: Props) => {
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState(BoardData);
  const [showForm, setShowForm] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(0);

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
    const [movedItem] = newBoardData[sourceIndex].items.splice(result.source.index, 1);
    newBoardData[destIndex].items.splice(result.destination.index, 0, movedItem);

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
        e.currentTarget.value = '';
      }
    }
  };

  return (
    <div className="p-10 flex flex-col h-screen">
      <DashHeader />

      {ready && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-4 gap-5 my-5">
            {boardData.map((board, bIndex) => (
              <div key={board.name}>
                <Droppable droppableId={bIndex.toString()}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`bg-gray-100 rounded-md shadow-md flex flex-col relative overflow-hidden ${
                        snapshot.isDraggingOver ? "bg-green-100" : ""
                      }`}
                    >
                      <span className="w-full h-1 bg-gradient-to-r from-pink-700 to-red-200 absolute inset-x-0 top-0"></span>
                      <h4 className="p-3 flex justify-between items-center mb-2">
                        <span className="text-2xl text-gray-600">{board.name}</span>
                        <DotsVerticalIcon className="w-5 h-5 text-gray-500" />
                      </h4>
                      <div
                        className="overflow-y-auto overflow-x-hidden h-auto"
                        style={{ maxHeight: 'calc(100vh - 290px)' }}
                      >
                        {board.items.length > 0 &&
                          board.items.map((item, iIndex) => (
                            <CardItem key={item.id} data={item} index={iIndex} />
                          ))}
                        {provided.placeholder}
                      </div>
                      {showForm && selectedBoard === bIndex ? (
                        <div className="p-3">
                          <textarea
                            className="border-gray-300 rounded focus:ring-purple-400 w-full"
                            rows={3}
                            placeholder="Task info"
                            data-id={bIndex}
                            onKeyDown={onTextAreaKeyPress}
                          />
                        </div>
                      ) : (
                        <button
                          className="flex justify-center items-center my-3 space-x-2 text-lg"
                          onClick={() => {
                            setSelectedBoard(bIndex);
                            setShowForm(true);
                          }}
                        >
                          <span>Add task</span>
                          <PlusCircleIcon className="w-5 h-5 text-gray-500" />
                        </button>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      )}
    </div>
  );
};

export default Dashboard;
