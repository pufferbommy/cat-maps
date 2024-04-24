import axios from "@/lib/axios";

const auth = async (action: "login" | "register", values: any) => {
  const url = `auth/${action}`;
  const response = await axios.post<BaseResponse<Auth>>(url, values);
  return response.data.data!;
};

const getProfile = async (signal?: AbortSignal) => {
  const response = await axios.get<BaseResponse<Profile>>("auth/profile", {
    signal,
  });
  return response.data.data!;
};

const refresh = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const response = await axios.post<BaseResponse<Auth>>("auth/refresh", {
    refreshToken,
  });
  return response.data.data!;
};

export { auth, getProfile, refresh };
