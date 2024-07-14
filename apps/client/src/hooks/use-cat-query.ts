import { getAllCatsQuery } from "@/queries/get-all-cats-query";

export const useCatQuery = () => {
  const queryKey = ["cat"];

  const queryFn = async () => {
    return getAllCatsQuery().then((result) => result.data);
  };

  return {
    queryKey,
    queryFn,
  };
};
