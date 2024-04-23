import { toast } from "sonner";
import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: "/api",
});

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

instance.interceptors.response.use(
  (response: AxiosResponse<BaseResponse, any>) => {
    try {
      if (!response.data.success) throw new Error(response.data.message);
      if (response.data.message) toast.success(response.data.message);
    } catch (error) {
      if (response.data.message) toast.error((error as Error).message);
    }
    return response;
  }
);

export default instance;
