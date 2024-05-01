import axios from "@/lib/axios";

const auth = async (action: "login" | "register", values: any) => {
  const url = action;
  const response = await axios.post<BaseResponse<Auth>>(url, values);
  return response;
};

const getProfile = async (signal?: AbortSignal) => {
  const url = "profile";
  const response = await axios.get<BaseResponse<Profile>>(url, {
    signal,
  });
  return response.data.data!;
};

const refresh = async () => {
  const url = "refresh";
  const refreshToken = localStorage.getItem("refreshToken");
  const response = await axios.post<BaseResponse<Auth>>(url, {
    refreshToken,
  });
  return response.data.data!;
};

export { auth, getProfile, refresh };
