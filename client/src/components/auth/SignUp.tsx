import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useFormik } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AuthSchema } from "../../utils/yup";
import { styles } from "../../styles/style";
import { useRegisterMutation } from "../../../redux/features/auth/authApi";

export default function SignUp({ setRoute }: any) {
  const [show, setshow] = useState(false);
  const [register, {isSuccess, error}] = useRegisterMutation();
  useEffect(() => {
    if(isSuccess){
      toast.success("Signup successful")
      setRoute("Login")
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  },[isSuccess, error])

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: AuthSchema,
    onSubmit: async ({ email, password }) => {
    await register({ email, password }).unwrap();
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (

    <div className={!setRoute ? "min-w-full justify-center items-center max-w-[400px] flex h-screen  bg-gray-100" : ""}>
    <div className=" text-black bg-white">
      <h1
        className={`${styles.title} text-2xl  tracking-wider mb-6 mt-5 uppercase`}
      >
        Sign up
      </h1>
      <form onSubmit={handleSubmit} className="px-8">
        <label className={`${styles.label}`}>Email</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="Enter your email"
          className={`${errors.email && touched.email && "border-red-500"} ${
            styles.input
          } text-sm`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-1 text-sm block">
            {errors.email}
          </span>
        )}

        <div className="w-full mt-5 relative">
          <label className={`${styles.label} `}>Password</label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="Enter your password"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input} text-sm`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              size={20}
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              onClick={() => setshow(true)}
            />
          ) : (
            <AiOutlineEye
              size={20}
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              onClick={() => setshow(false)}
            />
          )}
        </div>
        {errors.password && touched.password && (
          <span className="text-red-500 pt-1 text-sm block">
            {errors.password}
          </span>
        )}
        <p className="text-xs mt-1 text-gray-600">- Uppercase letters (A-Z)</p>
        <p className="text-xs text-gray-600 ">- Lowercase letters (a-z)</p>
        <p className="text-xs text-gray-600 ">- Numbers (0-9)</p>

        <div className="w-full mt-10">
          <input
            type="submit"
            value="Sign Up"
            className={`${styles.button} text-white  py-3 `}
          />
        </div>
        <br />

        <h5 className="text-center pt-4 font-Poppins text-[14px]">
          Already have an account?{" "}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer "
            onClick={() => setRoute("Login")}
          >
            Sign in
          </span>
        </h5>
      </form>
      <br />
    </div>
    </div>
  );
}
