import React, { useState } from "react";
import { userServices } from "../../services/api/userAPI";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Modal = ({ email, path }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const handleSubmit = async () => {
    const response = await userServices.otpVerify({ otp, email });
    if (response?.status === 200) {
      toast.success(response?.data?.message);
      setTimeout(() => {
        navigate(path, { state: { email } });
      }, 2000);
    }
    if (response?.status === 400) {
      toast.error(response.data.message);
    }
    if (response?.status === 500) {
      toast.error("please try again later");
    }
    setOtp("");
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <h3 className="text-center font-bold text-lg">OPT Alert!</h3>
        <form method="dialog" onSubmit={handleSubmit}>
          {/* if there is a button in form, it will close the modal */}
          <div className="mb-4 flex flex-col">
            <div className="focus-within:border-pink-600 relative flex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
              <input
                type="text"
                id="signup-otp"
                className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Enter your 4 digits OTP"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="mx-auto bg-pink-500 px-4 py-3 text-white rounded-3xl"
          >
            Verify
          </button>
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default Modal;
