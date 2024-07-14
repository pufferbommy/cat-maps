import { getUserProfileQuery } from "@/queries/get-user-profile-query";

export const useUserQuery = () => {
  const queryKey = ["user"];

  const queryFn = async () => {
    return getUserProfileQuery().then((result) => result.data);
  };

  return {
    queryKey,
    queryFn,
  };
};
