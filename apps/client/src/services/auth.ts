import axios from "@/lib/axios";
import { setIsLoadingProfile, setProfile } from "@/store/profile";

const auth = async (action: "login" | "register", values: any) => {
  const url = `/v1/user/${action}`;
  const response = await axios.post<BaseResponse<Auth>>(url, values);
  return response;
};

const getProfile = async (signal?: AbortSignal) => {
  try {
    setIsLoadingProfile(true);
    const url = "profile";
    const response = await axios.get<BaseResponse<Profile>>(url, {
      signal,
    });
    setProfile(response.data.data!);
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoadingProfile(false);
  }
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
