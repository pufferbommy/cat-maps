import { env } from "@/env";

export const toggleLike = async (data: ToggleLikeData) => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(
    `${env.NEXT_PUBLIC_SERVER_URL}/api/v1/cat/toggle-like`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }
  );
  return await response.json();
};
