"use client"
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {AuthSchema} from "../../utils/yup"
import { useFormik } from "formik";
import { styles } from "../../styles/style";
import { useLoginMutation } from "../../../redux/features/auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedIn } from "../../../redux/features/auth/authSlice";


export default function Login({ setRoute, setOpen }: any) {
  const [show, setshow] = useState(false);
  const [login, {isSuccess, isError}] = useLoginMutation();
  const isLoggedIn = useSelector((state:any) => state.auth.isLoggedIn)
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoggedIn) {
      setOpen(false);
    }
  }, [ isLoggedIn]);
  useEffect(() => {
    if(isSuccess){
      dispatch(userLoggedIn());
      toast.success("Login success");
      setOpen(false);
    }
    if(isError){
      toast.error("Invalid Credentials")
    }
  }, [isSuccess, isError])
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: AuthSchema,
    onSubmit: async ({ email, password }) => {
      try {
        const response = await login({ email, password }).unwrap();
         if (response.error) {
          toast.error("inavlid credintials");
        }
      } catch (err) {
        if (err) throw err;
        toast.error("invalid credentials");
      }
    },
  });
  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className={!setRoute ? "min-w-full justify-center items-center max-w-[400px] flex h-screen bg-gray-100 text-black" : "text-black bg-gray-100"}>
    <div className=" text-black bg-white">
      <h1
        className={`${styles.title} mb-6 mt-5 text-2xl uppercase tracking-wider `}
      >
        Log In
      </h1>
      <form onSubmit={handleSubmit} className="px-8">
        <label className={`${styles.label} `}>Email</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="nabeel@gmail.com"
          className={`${errors.email && touched.email && "border-red-500"} ${
            styles.input
          } text-sm`}
        />
        {errors.email && touched.email && (
          <span className="block pt-1 text-sm text-red-500">
            {errors.email}
          </span>
        )}
        <div className="relative mt-5 w-full">
          <label className={`${styles.label} `}>Password</label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="Nabeel@123"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input} text-sm`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              size={20}
              className="z-1 absolute bottom-3 right-2 cursor-pointer"
              onClick={() => setshow(true)}
            />
          ) : (
            <AiOutlineEye
              size={20}
              className="z-1 absolute bottom-3 right-2 cursor-pointer"
              onClick={() => setshow(false)}
            />
          )}
        </div>
        {errors.password && touched.password && (
          <span className="block pt-1 text-sm text-red-500">
            {errors.password}
          </span>
        )}
        <div className="mt-10 w-full">
          <input
            type="submit"
            value={"Login"}
            className={`${styles.button} py-3  text-white `}
          />
        </div>
        <br />
        <h5 className="pt-4 text-center font-Poppins text-[14px]">
          Not have any account?{" "}
          <span
            className="cursor-pointer pl-1 text-[#2190ff]"
            onClick={() => setRoute("SignUp")
            }
          >
            Sign up
          </span>
        </h5>
      </form>
      <br />
    </div>
    </div>
  );
}
