import { env } from "@/env";

export const getAllCatsQuery = async () => {
  const response = await fetch(`${env.NEXT_PUBLIC_SERVER_URL}/api/v1/cat`);
  const result: BaseResponse<CatDto[]> = await response.json();
  return result;
};
