import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import { DotsVerticalIcon, PlusCircleIcon } from "@heroicons/react/outline";
import CardItem from "../components/CardItem";

type Props = {
  droppableId: string;
  tasks: any;
  showForm: Boolean;
  selectedBoard: any;
  setSelectedBoard: any;
  setShowForm: any;
  onTextAreaKeyPress: any;
  title: string;
};

const DroppableColumn = ({
  droppableId,
  tasks,
  showForm,
  selectedBoard,
  setSelectedBoard,
  setShowForm,
  onTextAreaKeyPress,
  title,
}: Props) => {
  return (
    <Droppable droppableId={droppableId}>
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
            <span className="text-xl text-gray-600 pl-4 pt-2 font-medium">{title}</span>
            <DotsVerticalIcon className="w-5 h-5 text-gray-500" />
          </h4>
          <div
            className="overflow-y-auto overflow-x-hidden h-auto"
            style={{ maxHeight: "calc(100vh - 290px)" }}
          >
            {tasks &&
              tasks.map(
                (item: any, index: number) =>
                  item.status === droppableId && (
                    <CardItem key={item._id} data={item} index={index} />
                  )
              )}
            {provided.placeholder}
          </div>
          {title === "TODO" &&
            (showForm && selectedBoard === droppableId ? (
              <div className="p-3">
                <textarea
                  className="border-gray-300 rounded focus:ring-purple-400 w-full"
                  rows={3}
                  placeholder="Task info"
                  data-id={droppableId}
                  onKeyDown={onTextAreaKeyPress}
                />
              </div>
            ) : (
              <button
                className="flex justify-center items-center my-3 space-x-2 text-sm font-medium uppercase "
                onClick={() => {
                  setSelectedBoard(droppableId);
                  setShowForm(true);
                }}
              >
                <div className="hover:bg-gray-200 flex gap-2 p-2 px-3 rounded-lg">
                <span>Add task</span>
                <PlusCircleIcon className="w-5 h-5 text-gray-800" />
                </div>
              </button>
            ))}
        </div>
      )}
    </Droppable>
  );
};

export default DroppableColumn;
