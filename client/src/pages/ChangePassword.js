import React from "react";
import { useForm } from "react-hook-form";
import { userServices } from "../services/api/userAPI";
import { ToastContainer, toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
const ChangePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await userServices.changePassword({ ...data, email });
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        toast.error(error?.response.data.message);
      }
      if (error?.response?.status === 500) {
        toast.error("please try again later");
      }
    } finally {
      reset();
    }
  };
  return (
    <>
      <Navbar />
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
      <div className="mx-auto mt-24 max-w-md">
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <div className="mb-4 inline-block rounded-full bg-pink-200 p-2 text-pink-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              </div>
              <h1 className="block text-2xl font-bold text-gray-800">
                Change Password
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Don't worry we'll send you reset instructions.
              </p>
            </div>
            <div className="mt-6">
              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-y-4">
                  {/* Form Group */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm text-gray-600"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        placeholder="Enter new password"
                        type="password"
                        id="password"
                        name="password"
                        className="peer block w-full rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none ring-offset-1 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-500"
                        required=""
                        aria-describedby="email-error"
                        {...register("password", {
                          required: "password is required",
                        })}
                      />

                      <p
                        className="mt-2 hidden text-xs text-rose-600 peer-invalid:block"
                        id="email-error"
                      >
                        {errors.password && (
                          <span>{errors.password.message}</span>
                        )}
                      </p>
                    </div>
                  </div>
                  {/* /Form Group */}
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-pink-500 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                  >
                    Reset password
                  </button>
                </div>
              </form>
              {/* /Form */}
            </div>
          </div>
        </div>
        <p className="mt-3 flex items-center justify-center divide-x divide-gray-300 text-center">
          {/* <a class="pl-3 text-sm text-gray-600 decoration-2 hover:text-pink-600 hover:underline" href="#"> FAQs </a> */}
          <span className="inline pr-3 text-sm text-gray-600">
            Remember your password?
            <Link
              className="font-medium text-pink-600 decoration-2 hover:underline"
              to="/login"
            >
              {" "}
              Sign in here{" "}
            </Link>
          </span>
          <Link
            className="pl-3 text-sm text-gray-600 decoration-2 hover:text-pink-600 hover:underline"
            target="_blank"
          >
            {" "}
            Contact Support{" "}
          </Link>
        </p>
      </div>
    </>
  );
};

export default ChangePassword;
