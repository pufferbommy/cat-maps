import axios from "axios";

import { env } from "@/env";
import { toast } from "sonner";

const axiosInstance = axios.create({
  baseURL: `${env.NEXT_PUBLIC_SERVER_URL}/api`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.message) {
      toast.success(response.data.message);
    }
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      const url = "/v1/user/refresh";
      const response = await axiosInstance.post<BaseResponse<AuthTokens>>(url, {
        refreshToken,
      });
      if (response.data.data) {
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
      }
    }
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
