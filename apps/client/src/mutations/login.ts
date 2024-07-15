import { env } from "@/env";
import { Login } from "@/schema/login.schema";
import { toast } from "sonner";

export const login = async (values: Login) => {
  const response = await fetch(
    `${env.NEXT_PUBLIC_SERVER_URL}/api/v1/user/login`,
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
    localStorage.setItem(
      "accessToken",
      JSON.stringify(result.data?.accessToken)
    );
    localStorage.setItem(
      "refreshToken",
      JSON.stringify(result.data?.refreshToken)
    );
  } else {
    toast.error(result.message);
  }
  return result;
};
