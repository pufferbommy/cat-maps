import { toast } from "sonner";

import { env } from "@/env";
import { Register } from "@tanstack/react-query";

export const register = async (values: Register) => {
  const response = await fetch(
    `${env.NEXT_PUBLIC_SERVER_URL}/api/v1/user/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }
  );
  const result: BaseResponse<AuthTokens> = await response.json();
  if (response.status === 200) {
    toast.success(result.message);
    if (result.data) {
      localStorage.setItem("accessToken", result.data.accessToken);
      localStorage.setItem("refreshToken", result.data.refreshToken);
    }
  } else {
    toast.error(result.message);
  }
  return result;
};
