import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { taskSchema } from "../../utils/yup";
import { styles } from "../../styles/style";
import { useUpdateTaskMutation } from "../../../redux/features/apiSlice";
import { socketId } from "../../utils/socket";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../../redux/features/auth/authSlice";
import { useModal } from "@/hooks/useModal";

type TaskFormData = {
  _id?: string;
  title: string;
  description?: string;
  priority: string;
  assignee: string;
  dueDate: Date;
};

type Props = {
  setOpen: (open: any) => void;
  tasks: any;
};

const EditTaskForm: React.FC<Props> = ({ setOpen, tasks: task }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: yupResolver(taskSchema),
    defaultValues: task,
  });
  const dispatch = useDispatch()
  const {setOpen:setAuthModal} = useModal()
  const [updateTask, { isSuccess, error }] = useUpdateTaskMutation();
  
  useEffect(() => {
    if(error){
      dispatch(userLoggedOut())
      setAuthModal(true)
    }
  }, [error])

  useEffect(() => {
    reset(task);
  }, [task, reset]);

  const onSubmit = async (data: TaskFormData) => {
    try {
      const newData = { ...data, _id: task._id };
      await updateTask({ ...newData }).unwrap();
      socketId.emit("tasks", {data: "task updated"})
      setOpen(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 flex flex-col gap-3">
      <p className="text-sm uppercase font-semibold">EDIT TASK</p>

      <div>
        <label className={styles.label}>Title:</label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <input type="text" {...field} className={styles.input} />
          )}
        />
        <p className="text-xs text-red-400 pt-1">{errors.title?.message}</p>
      </div>

      <div>
        <label className={styles.label}>Description:</label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <textarea {...field} className={styles.input} />
          )}
        />
        <p className="text-xs text-red-400 pt-1">
          {errors.description?.message}
        </p>
      </div>

      <div>
        <label className={styles.label}>Priority:</label>
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <select {...field} className={styles.input}>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          )}
        />
        <p className="text-xs text-red-400 pt-1">{errors.priority?.message}</p>
      </div>

      <div>
        <label className={styles.label}>Assignee Name:</label>
        <Controller
          name="assignee"
          control={control}
          render={({ field }) => (
            <input type="text" {...field} className={styles.input} />
          )}
        />
        <p className="text-xs text-red-400 pt-1">{errors.assignee?.message}</p>
      </div>

      <div>
        <label className={styles.label}>Due Date:</label>
        <Controller
          name="dueDate"
          control={control}
          render={({ field }) => (
            <input
              type="date"
              {...field}
              className={styles.input}
              value={
                field.value
                  ? new Date(field.value).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) => field.onChange(new Date(e.target.value))}
            />
          )}
        />
        <p className="text-xs text-red-400 pt-1">{errors.dueDate?.message}</p>
      </div>

      <button type="submit" className={`${styles.button} text-white mt-4`}>
        Update Task
      </button>
    </form>
  );
};

export default EditTaskForm;
