import { toast } from "sonner";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import * as authService from "@/services/auth";

const instance = axios.create({
  baseURL: "/api",
});

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  accessToken && (config.headers.Authorization = `Bearer ${accessToken}`);
  return config;
});

instance.interceptors.response.use(
  async (response: AxiosResponse<BaseResponse>) => {
    try {
      if (!response.data.success) throw new Error(response.data.message);
      if (response.data.message) toast.success(response.data.message);
    } catch (error) {
      if ((error as Error).message === "jwt expired") {
        const { accessToken, refreshToken } = await authService.refresh();
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        const retryConfig: AxiosRequestConfig = {
          ...response.config,
          headers: {
            ...response.config.headers,
            Authorization: `Bearer ${accessToken}`,
          },
        };

        return instance(retryConfig);
      } else {
        if (response.data.message) toast.error((error as Error).message);
      }
    }
    return response;
  }
);

export default instance;
