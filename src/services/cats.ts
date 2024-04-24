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

export { addCat };
