import axios from "@/lib/axios";
import { setIsLoadingCats } from "@/store/cats";

const getCats = async (signal?: AbortSignal) => {
  setIsLoadingCats(true);
  const response = await axios.get<BaseResponse<Cat[]>>("cats", {
    signal,
  });
  setIsLoadingCats(false);
  return response.data.data;
};

const addCat = async ({
  latitude,
  longitude,
  image,
}: {
  latitude: number;
  longitude: number;
  image: string;
}) => {
  const response = await axios.post("cats", {
    latitude,
    longitude,
    image,
  });
  return response.data.data!;
};

const toggleLike = async (catId: string) => {
  const response = await axios.put<BaseResponse<Like>>(
    `cats/${catId}/toggle-like`
  );
  return response.data.data!;
};

export { getCats, addCat, toggleLike };
