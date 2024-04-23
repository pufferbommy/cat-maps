"use client";

import { toast } from "sonner";

import axios from "@/lib/axios";
import { clearProfile, setIsLoadingProfile, setProfile } from "@/store/profile";

const useAuth = () => {
  const getProfile = async () => {
    try {
      setIsLoadingProfile(true);
      const response = await axios.get<BaseResponse<Profile>>("auth/profile");
      setProfile(response.data.data!);
    } catch (error) {
      if (error instanceof Error && "jwt expired" === error.message) {
        const token = await refresh();
        if (!token) {
          clearProfile();
          return;
        }
        localStorage.setItem("accessToken", token.accessToken);
        localStorage.setItem("refreshToken", token.refreshToken);
        getProfile();
      } else {
        clearProfile();
      }
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const refresh = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await axios.post<BaseResponse<Auth>>("/auth/refresh", {
      refreshToken,
    });
    return response.data.data;
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    toast.success("ออกจากระบบแล้ว");
    clearProfile();
  };

  return {
    getProfile,
    logout,
  };
};

export { useAuth };
