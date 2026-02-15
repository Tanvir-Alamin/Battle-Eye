import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const useAxiosSecure = () => {
  const { user, logOut } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
  });

  // Request interceptor
  axiosInstance.interceptors.request.use((config) => {
    if (user?.accessToken) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }
    return config;
  });

  // Response interceptor
  // axiosInstance.interceptors.response.use(
  //   (res) => res,
  //   async (err) => {
  //     if (err?.response?.status === 401 || err?.response?.status === 403) {
  //       await logOut();
  //       window.locatio.href = "/login"; // safer than navigate inside interceptor
  //     }
  //     return Promise.reject(err);
  //   },
  // );

  axiosInstance.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalRequest = err.config;

      // Only logout if the request was to /dashboard/... or any protected route
      if (
        (err?.response?.status === 401 || err?.response?.status === 403) &&
        originalRequest?.url?.includes("/dashboard")
      ) {
        // // await logOut();
        // window.location.href = "/login";
      }

      return Promise.reject(err);
    },
  );

  return axiosInstance;
};

export default useAxiosSecure;
