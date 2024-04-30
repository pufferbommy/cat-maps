import axios from "@/lib/axios";

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
  const response = await axios.put(`cats/${catId}/toggle-like`);
  return response.data.data!;
};

export { addCat, toggleLike };