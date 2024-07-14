import { env } from "@/env";

export const refreshUserTokensQuery = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const response = await fetch(
    `${env.NEXT_PUBLIC_SERVER_URL}/api/v1/user/refresh`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken,
      }),
    }
  );
  const result: BaseResponse<UserTokens> = await response.json();
  return result;
};
