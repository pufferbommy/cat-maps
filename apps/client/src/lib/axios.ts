import { toast } from "sonner";
import axios, { isCancel, AxiosError, AxiosResponse } from "axios";

import * as authService from "@/services/auth";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  accessToken && (config.headers.Authorization = `Bearer ${accessToken}`);
  return config;
});

instance.interceptors.response.use(
  (response: AxiosResponse<BaseResponse>) => {
    response.data.message && toast.success(response.data.message);
    return response;
  },
  async (error) => {
    const e = error as AxiosError;
    const status = e.response?.status;
    const message = (e.response?.data as BaseResponse)?.message || "";

    if (status === 401) {
      const { accessToken, refreshToken } = await authService.refresh();
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      return instance(error.config);
    } else if (!isCancel(error) && message) {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default instance;
