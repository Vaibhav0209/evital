import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { useForm } from "react-hook-form";
import { userServices } from "../services/api/userAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      address: "",
      dob: "",
      mobile: "",
    },
  });

  useEffect(() => {
    fetchUserInformation();
  }, []);
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const fetchUserInformation = async () => {
    try {
      const response = await userServices.userProfileInformation();
      let profileData = await response?.data?.data;
      if (profileData) {
        profileData.dob = formatDate(profileData.dob);

        reset(profileData); // Correctly resets the form with fetched data
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch profile data.");
    }
  };
  const onSubmit = async (data) => {
    try {
      const response = await userServices.changeProfileInformation(data);

      if (response?.status === 200) {
        toast.success(response?.data?.message);
      } else if (response?.status === 404) {
        toast.error(response?.data?.message);
      } else if (response?.status === 500) {
        toast.error("Please try again later.");
      }
    } catch (error) {
      console.error("Submit Error:", error); // Log any errors
      toast.error("Failed to update profile.");
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
      <div className="mx-auto mt-20 mb-5 max-w-md">
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <div className="mb-4 inline-block rounded-full bg-pink-200 p-2 text-pink-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z"
                    fill="#000000"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z"
                    fill="#000000"
                  />
                </svg>
              </div>
              <h1 className="block text-2xl font-bold text-gray-800">
                Update profile
              </h1>
            </div>
            <div className="mt-6">
              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-y-4">
                  {/* Form Group */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm text-gray-600"
                    >
                      Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        className="peer block w-full rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none ring-offset-1 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-500"
                        placeholder="Enter your Name"
                        {...register("name", { required: "Name is required" })}
                      />
                    </div>
                    <p className="text-xs text-red-500">
                      {errors.name && <span>{errors.name.message}</span>}
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="mobile"
                      className="mb-2 block text-sm text-gray-600"
                    >
                      Mobile number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="mobile"
                        className="peer block w-full rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none ring-offset-1 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-500"
                        placeholder="Enter your mobile number"
                        {...register("mobile", {
                          required: "Mobile is required",
                          pattern: {
                            value: /^\d{10}$/,
                            message: "Must be 10 digits",
                          },
                        })}
                      />
                    </div>
                    <p className="text-xs text-red-500">
                      {errors.mobile && <span>{errors.mobile.message}</span>}
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm text-gray-600"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        disabled
                        id="email"
                        className="peer block w-full rounded-md border border-gray-200 bg-gray-200 py-3 px-4 text-sm outline-none ring-offset-1 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-500"
                        placeholder="Enter your Email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email address",
                          },
                        })}
                      />
                    </div>
                    <p className="text-xs text-red-500">
                      {errors.email && <span>{errors.email.message}</span>}
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="dob"
                      className="mb-2 block text-sm text-gray-600"
                    >
                      DOB
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="dob"
                        className="peer block w-full rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none ring-offset-1 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-500"
                        placeholder="Enter your BirthDate"
                        {...register("dob", {
                          required: "DOB is required",
                          validate: (value) => {
                            const selectedDate = new Date(value);
                            const currentDate = new Date();
                            currentDate.setHours(0, 0, 0, 0);
                            return (
                              selectedDate < currentDate ||
                              "Date must be in the past"
                            );
                          },
                        })}
                      />
                    </div>
                    <p className="text-xs text-red-500">
                      {errors.dob && <span>{errors.dob.message}</span>}
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="mb-2 block text-sm text-gray-600"
                    >
                      Address
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="address"
                        className="peer block w-full rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none ring-offset-1 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-500"
                        placeholder="Enter your Address"
                        {...register("address", {
                          required: "Address is required",
                          pattern: {
                            value: /^[\s\S]{0,300}$/,
                            message: "Less than 300 characters",
                          },
                        })}
                      />
                    </div>
                    <p className="text-xs text-red-500">
                      {errors.address && <span>{errors.address.message}</span>}
                    </p>
                  </div>

                  {/* /Form Group */}
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-pink-500 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                  >
                    Change profile
                  </button>
                </div>
              </form>
              {/* /Form */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
