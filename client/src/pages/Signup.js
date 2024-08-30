import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { userServices } from "../services/api/userAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../components/Modal/Modal";
import img from "../img/831.jpg";

const Signup = () => {
  const [email, setEmail] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const response = await userServices.signup(data);
    if (response?.status === 200) {
      toast.success(response?.data?.message);
      setEmail(data.email);
      document.getElementById("my_modal_3").showModal();
    }
    if (response?.status === 400) {
      toast.error(response.data.message);
    }
    if (response?.status === 500) {
      toast.error("please try again later");
    }
    reset();
  };
  return (
    <>
      <Modal email={email} path={"/login"} />
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
      <div className="mx-auto flex h-full justify-center items-center max-w-lg flex-col md:max-w-none md:flex-row md:pr-10">
        <div className="max-w-md rounded-3xl bg-gradient-to-t from-pink-700 via-pink-700 to-pink-600 px-4 py-10 text-white sm:px-10 md:m-6 md:mr-8">
          <Link to="/" className="flex space-x-3">
            <svg
              className="mb-4"
              fill="#FFFFFF"
              width="20px"
              height="20px"
              viewBox="0 0 52 52"
              data-name="Layer 1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M50,24H6.83L27.41,3.41a2,2,0,0,0,0-2.82,2,2,0,0,0-2.82,0l-24,24a1.79,1.79,0,0,0-.25.31A1.19,1.19,0,0,0,.25,25c0,.07-.07.13-.1.2l-.06.2a.84.84,0,0,0,0,.17,2,2,0,0,0,0,.78.84.84,0,0,0,0,.17l.06.2c0,.07.07.13.1.2a1.19,1.19,0,0,0,.09.15,1.79,1.79,0,0,0,.25.31l24,24a2,2,0,1,0,2.82-2.82L6.83,28H50a2,2,0,0,0,0-4Z" />
            </svg>
            <span>Back</span>
          </Link>
          <h2 className=" text-3xl  mb-2 font-bold tracking-wider">Sign Up</h2>
          <a href="#" className="mb-20 block font-bold ">
            Have an account?{" "}
            <Link to="/login">
              <span className="underline">Login</span>
            </Link>
          </a>
          <p className="mb-4 text-3xl font-bold md:text-4xl md:leading-snug">
            Start your <br />
            journey with us
          </p>
          <p className="mb-28 leading-relaxed text-gray-200">
            Sign up to unlock personalized features and secure access to your
            account
          </p>
          <div className="bg-pink-600/80 rounded-2xl px-4 py-8">
            <p className="mb-3 text-gray-200">
              Experience seamless access and explore a world of opportunities
              with our advanced authentication system
            </p>
            <div className="">
              <div className="flex items-center">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={img}
                  alt="Simon Lewis"
                />
                <p className="ml-4 w-56">
                  <strong className="block font-medium">Simon Lewis</strong>
                  <span className="text-xs text-gray-200">
                    {" "}
                    Published 12 Bestsellers{" "}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <form className="px-4 py-20" onSubmit={handleSubmit(onSubmit)}>
          <p className="mb-1 font-medium text-gray-500">Email</p>
          <div className="mb-4 flex flex-col">
            <div className="focus-within:border-pink-600 relative flex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
              <input
                type="email"
                id="signup-email"
                className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Enter your Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>
            <p className="text-xs text-red-500">
              {errors.email && <span>{errors.email.message}</span>}
            </p>
          </div>
          <p className="mb-1 font-medium text-gray-500">Name</p>
          <div className="mb-4 flex flex-col">
            <div className="focus-within:border-pink-600 relative flex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
              <input
                type="text"
                id="signup-name"
                className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Enter your Name"
                name="name"
                {...register("name", {
                  required: "name is required",
                })}
              />
            </div>
            <p className="text-xs text-red-500">
              {errors.name && <span>{errors.name.message}</span>}
            </p>
          </div>
          <p className="mb-1 font-medium text-gray-500">Mobile</p>
          <div className="mb-4 flex flex-col">
            <div className="focus-within:border-pink-600 relativeflex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
              <input
                type="text"
                id="signup-mobile"
                className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Enter your mobile"
                name="mobile"
                {...register("mobile", {
                  required: "mobile is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "must be 10 digits",
                  },
                })}
                // {...register("mobile", {
                //   required: "Mobile is required",
                //   pattern: {
                //     value: /^\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}$/,
                //     message: "Invalid mobile number",
                //   },
                // })}
              />
            </div>
            <p className="text-xs text-red-500">
              {errors.mobile && <span>{errors.mobile.message}</span>}
            </p>
          </div>
          <p className="mb-1 font-medium text-gray-500">BirthDate</p>
          <div className="mb-4 flex flex-col">
            <div className="focus-within:border-pink-600 relativeflex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
              <input
                type="date"
                id="signup-dob"
                className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Enter your Birthdate"
                name="dob"
                {...register("dob", {
                  required: "DOB is required",
                  validate: (value) => {
                    const selectedDate = new Date(value);
                    const currentDate = new Date();
                    currentDate.setHours(0, 0, 0, 0);
                    return (
                      selectedDate < currentDate || "Date must be in the past"
                    );
                  },
                })}
              />
            </div>
            <p className="text-xs text-red-500">
              {errors.dob && <span>{errors.dob.message}</span>}
            </p>
          </div>
          <p className="mb-1 font-medium text-gray-500">Password</p>
          <div className="mb-4 flex flex-col">
            <div className="focus-within:border-pink-600 relative flex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
              <input
                type="password"
                id="signup-password"
                className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Choose a password (minimum 8 characters)"
                name="password"
                {...register("password", {
                  required: "password is required",
                  pattern: {
                    value: /^.{8,}$/,
                    message: "password atleast 8 character",
                  },
                })}
              />
            </div>
            <p className="text-xs text-red-500">
              {errors.password && <span>{errors.password.message}</span>}
            </p>
          </div>
          <p className="mb-1 font-medium text-gray-500">Address</p>
          <div className="mb-4 flex flex-col">
            <div className="focus-within:border-pink-600 relative flex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
              <input
                type="text"
                id="signup-address"
                className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Enter your address"
                {...register("address", {
                  required: "address is required",
                  pattern: {
                    value: /^[\s\S]{0,300}$/,
                    message: "less than 300 character",
                  },
                })}
              />
            </div>
            <p className="text-xs text-red-500">
              {errors.address && <span>{errors.address.message}</span>}
            </p>
          </div>
          <p className="mb-1 font-medium text-gray-500">Gender</p>
          <div className="mb-6 flex flex-col gap-y-2 gap-x-4 lg:flex-row">
            <div className="relative flex w-56 items-center justify-center rounded-xl bg-gray-50 px-4 py-3 font-medium text-gray-700">
              <input
                className="peer hidden"
                type="radio"
                name="gender"
                id="radio1"
                defaultChecked=""
                value="Male"
                {...register("gender", {
                  required: "gender is required",
                })}
              />
              <label
                className="peer-checked:border-pink-600 peer-checked:bg-pink-200 absolute top-0 h-full w-full cursor-pointer rounded-xl border"
                htmlFor="radio1"
              >
                {" "}
              </label>
              <div className="peer-checked:border-transparent peer-checked:bg-pink-600 peer-checked:ring-2 absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-pink-600 ring-offset-2" />
              <span className="pointer-events-none z-10">Male</span>
            </div>
            <div className="relative flex w-56 items-center justify-center rounded-xl bg-gray-50 px-4 py-3 font-medium text-gray-700">
              <input
                className="peer hidden"
                type="radio"
                name="gender"
                id="radio3"
                defaultChecked=""
                value="Female"
                {...register("gender", {
                  required: "gender is required",
                })}
              />
              <label
                className="peer-checked:border-pink-600 peer-checked:bg-pink-200 absolute top-0 h-full w-full cursor-pointer rounded-xl border"
                htmlFor="radio3"
              >
                {" "}
              </label>
              <div className="peer-checked:border-transparent peer-checked:bg-pink-600 peer-checked:ring-2 absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-pink-600 ring-offset-2" />
              <span className="pointer-events-none z-10">Female</span>
            </div>
            <p className="text-xs text-red-500">
              {errors.gender && <span>{errors.gender.message}</span>}
            </p>
          </div>

          <button className="hover:shadow-pink-600/40 rounded-xl bg-gradient-to-r from-pink-700 to-pink-600 px-8 py-3 font-bold text-white transition-all hover:opacity-90 hover:shadow-lg">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
