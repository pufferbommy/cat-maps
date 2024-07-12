import axios from "@/lib/axios";
import { Login } from "@/schema/login.schema";
import { Register } from "@/schema/register.schema";
import { setIsLoadingProfile, setProfile } from "@/store/profile";

const resource = "user";

export const login = async (values: Login) => {
  const url = `${resource}/login`;
  const response = await axios.post<BaseResponse<AuthUserResDto>>(url, values);
  return response;
};

export const register = async (values: Register) => {
  const url = `${resource}/register`;
  const response = await axios.post<BaseResponse<AuthUserResDto>>(url, values);
  return response;
};

export const getProfile = async (signal?: AbortSignal) => {
  try {
    setIsLoadingProfile(true);
    const url = `${resource}/profile`;
    const response = await axios.get<BaseResponse<UserProfileResDto>>(url, {
      signal,
    });
    setProfile(response.data.data!);
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoadingProfile(false);
  }
};

export const refresh = async () => {
  const url = `${resource}/refresh`;
  const refreshToken = localStorage.getItem("refreshToken");
  const response = await axios.post<BaseResponse<AuthUserResDto>>(url, {
    refreshToken,
  });
  return response.data.data!;
};
