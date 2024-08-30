import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { userServices } from "../services/api/userAPI";

const Login = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  useEffect(() => {
    setToken();
  }, [token]);
  const onSubmit = async (data) => {
    try {
      const response = await userServices.login(data);

      if (response?.status === 200) {
        toast.success(await response?.data?.message);
        localStorage.setItem("token", response?.data?.authToken);
        setToken(localStorage.getItem("token"));
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
      reset();
    } catch (error) {
      if (
        error?.response?.status === 401 ||
        error?.response?.status === 404 ||
        error?.response?.status === 400
      ) {
        toast.error(error?.response?.data?.message || "error");
      }
      if (error?.response?.status === 500) {
        toast.error("please try again later");
      }
      reset();
    }
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Navbar />
      <div className="flex h-screen w-screen items-center overflow-hidden px-2">
        {/* Login */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative flex w-96 flex-col space-y-5 rounded-lg border bg-white px-5 py-10 shadow-xl sm:mx-auto"
        >
          <div className="-z-10 absolute top-4 left-1/2 h-full w-5/6 -translate-x-1/2 rounded-lg bg-pink-600 sm:-right-10 sm:top-auto sm:left-auto sm:w-full sm:translate-x-0" />
          <div className="mx-auto mb-2 space-y-3">
            <h1 className="text-center text-3xl font-bold text-gray-700">
              Sign in
            </h1>
            <p className="text-gray-500">Sign in to access your account</p>
          </div>
          <>
            <div className="relative mt-2 w-full">
              <input
                type="text"
                id="email"
                defaultValue=""
                className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
                placeholder="Enter email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              <label
                htmlFor="email"
                className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-pink-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
              >
                {" "}
                Enter Your Email{" "}
              </label>
            </div>
            <p className="text-xs text-red-500">
              {errors.email && <span>{errors.email.message}</span>}
            </p>
          </>
          <div>
            <div className="relative mt-2 w-full">
              <input
                type="password"
                id="password"
                className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
                placeholder="Enter Password"
                {...register("password", {
                  required: "password is required",
                  pattern: {
                    value: /^.{8,}$/,
                    message: "password atleast 8 character",
                  },
                })}
              />
              <label
                htmlFor="password"
                className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-pink-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
              >
                {" "}
                Enter Your Password
              </label>
            </div>
            <p className="text-xs text-red-500">
              {errors.password && <span>{errors.password.message}</span>}
            </p>
          </div>
          <div className="flex w-full items-center">
            <button
              type="submit"
              className="shrink-0 inline-block w-36 rounded-lg bg-pink-600 py-3 font-bold text-white"
            >
              Login
            </button>
            <Link
              to="/forgot-password"
              className="w-full text-center text-sm font-medium text-gray-600 hover:underline"
              href="#"
            >
              Forgot your password?
            </Link>
          </div>
          <p className="text-center text-gray-600">
            Don't have an account?
            <Link
              to="/signup"
              className="whitespace-nowrap font-semibold text-gray-900 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
        {/* /Login */}
      </div>
    </>
  );
};

export default Login;
