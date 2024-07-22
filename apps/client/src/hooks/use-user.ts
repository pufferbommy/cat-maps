import { useMutation, useQuery } from "@tanstack/react-query";

import axiosInstance from "@/lib/axios";
import { Login } from "@/schema/login.schema";
import { queryClient } from "@/lib/react-query";
import { Register } from "@/schema/register.schema";
import { keys as catsKeys } from "./use-cats";

export const keys = {
  getUserProfile: ["user", "profile"],
};

export const useUserLogin = () => {
  return useMutation({
    mutationFn: async (data: Login) => {
      const url = "/v1/user/login";
      const response = await axiosInstance.post<BaseResponse<AuthTokens>>(
        url,
        data
      );
      return response.data.data;
    },
    onSuccess: (result) => {
      if (result) {
        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("refreshToken", result.refreshToken);
      }
      queryClient.invalidateQueries({ queryKey: keys.getUserProfile });
      queryClient.invalidateQueries({ queryKey: catsKeys.getAllCats });
    },
  });
};

export const useUserRegister = () => {
  return useMutation({
    mutationFn: async (data: Register) => {
      const url = "/v1/user/register";
      const response = await axiosInstance.post<BaseResponse<AuthTokens>>(
        url,
        data
      );
      return response.data.data;
    },
    onSuccess: (result) => {
      if (result) {
        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("refreshToken", result.refreshToken);
      }
      queryClient.invalidateQueries({ queryKey: keys.getUserProfile });
      queryClient.invalidateQueries({ queryKey: catsKeys.getAllCats });
    },
  });
};

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: keys.getUserProfile,
    queryFn: async () => {
      const url = "/v1/user/profile";
      const response = await axiosInstance.get<BaseResponse<UserProfile>>(url);
      return response.data.data;
    },
  });
};
