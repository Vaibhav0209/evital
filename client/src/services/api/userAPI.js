import axiosInstance from "../axios.config";

export const userServices = {
  signup: async (data) => {
    return await axiosInstance.post("/signup", data);
  },
  otpVerify: async (data) => {
    return await axiosInstance.post("/verify-otp", data);
  },
  login: async (data) => {
    return await axiosInstance.post("/login", data);
  },
  forgotPassword: async (data) => {
    return await axiosInstance.patch("/forgot-password", data);
  },
  changePassword: async (data) => {
    return await axiosInstance.patch("/change-password", data);
  },
  userProfileInformation: async () => {
    return await axiosInstance.get("/get-user-information");
  },
  changeProfileInformation: async (data) => {
    return await axiosInstance.patch("/change-user-information", data);
  },
};
