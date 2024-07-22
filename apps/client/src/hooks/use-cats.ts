import { useMutation, useQuery } from "@tanstack/react-query";

import axiosInstance from "@/lib/axios";
import { queryClient } from "@/lib/react-query";

const keys = {
  getAllCats: ["cats"],
};

export const useGetAllCats = () => {
  return useQuery({
    queryKey: keys.getAllCats,
    queryFn: async () => {
      const url = "/v1/cat";
      const response = await axiosInstance.get<BaseResponse<Cat[]>>(url);
      return response.data.data;
    },
  });
};

export const useToggleLikeCat = () => {
  return useMutation({
    mutationFn: async (data: ToggleLikeData) => {
      const url = "/v1/cat/toggle-like";
      const response = await axiosInstance.patch<BaseResponse>(url, data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.getAllCats });
    },
  });
};

export const useAddCat = () => {
  return useMutation({
    mutationFn: async (data: AddCatData) => {
      const url = "/v1/cat";
      const response = await axiosInstance.post<BaseResponse>(url, data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.getAllCats });
    },
  });
};
