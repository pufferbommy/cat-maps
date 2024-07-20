import { env } from "@/env";
import { refreshUserTokensQuery } from "./refresh-user-tokens-query";

export const getUserProfileQuery = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(
    `${env.NEXT_PUBLIC_SERVER_URL}/api/v1/user/profile`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (response.status === 401) {
    const { data } = await refreshUserTokensQuery();
    if (data) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    }
  }
  const result: BaseResponse<UserProfile> = await response.json();
  return result;
};
