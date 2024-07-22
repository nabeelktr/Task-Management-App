import React, { useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { taskSchema } from "../../utils/yup";
import { styles } from "../../styles/style";
import { useAddTaskMutation, useGetUsersQuery } from '../../../redux/features/apiSlice';
import { socketId } from '../../utils/socket';
import { useDispatch, useSelector } from 'react-redux';
import { userLoggedOut } from '../../../redux/features/auth/authSlice';
import { useModal } from '../../hooks/useModal';

type TaskFormData = {
  title: string;
  description?: string | undefined;
  priority: string;
  assignee: string;
  dueDate: Date ;
}

type Props = {
  setOpen: (open: any) => void;
};

const AddTaskForm: React.FC<Props> = ({ setOpen }) => {
  const {
    data: users ,
    refetch,
  } = useGetUsersQuery({});
  const isLoggedIn = useSelector((state:any) => state.auth.isLoggedIn)
  const dispatch = useDispatch()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: yupResolver(taskSchema),
  });
  const {open, setOpen: setAuthModal} = useModal()
  const [addTask, {isSuccess, error, isError}] = useAddTaskMutation()
  
  useEffect(() => {
    if(isError || error){
      console.log("error", isError, error);
      setAuthModal(true)
      dispatch(userLoggedOut())
    }
  }, [isError, error])

  const onSubmit = async (data: TaskFormData) => {
      if(!isLoggedIn){
        console.log("error");
        setAuthModal(true)
      }else{
        await addTask({...data})
        socketId.emit("tasks", {data: "task added"})
      }
      setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 flex flex-col gap-3">
      <p className="text-sm uppercase font-semibold">ADD TASK</p>

      <div>
        <label className={styles.label}>Title:</label>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input type="text" {...field} className={styles.input} />
          )}
        />
        <p className="text-xs text-red-400 pt-1">
          {errors.title?.message}
        </p>
      </div>

      <div>
        <label className={styles.label}>Description:</label>
        <Controller
          name="description"
          control={control}
          defaultValue=""
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
          defaultValue="LOW"
          render={({ field }) => (
            <select {...field} className={styles.input}>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          )}
        />
        <p className="text-xs text-red-400 pt-1">
          {errors.priority?.message}
        </p>
      </div>

      <div>
        <label className={styles.label}>Assignee:</label>
        <Controller
          name="assignee"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <select {...field} className={styles.input}>
              <option value="">Select Assignee</option>
              {users && users.map((user: any) => (
                <option key={user._id} value={user.email}>
                  {user.email}
                </option>
              ))}
            </select>
          )}
        />
        <p className="text-xs text-red-400 pt-1">
          {errors.assignee?.message}
        </p>
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
              value={field?.value?.toString() || ""}
            />
          )}
        />
        <p className="text-xs text-red-400 pt-1">
          {errors?.dueDate?.message}
        </p>
      </div>

      <button type="submit" className={`${styles.button} text-white mt-4`}>
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;
