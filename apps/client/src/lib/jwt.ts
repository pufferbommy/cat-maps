import { env } from "@/env";
import * as jose from "jose";

const secret = new TextEncoder().encode(env.JWT_SECRET);

export const signJwt = async (payload: unknown, expirationTime: string) => {
  return await new jose.SignJWT({ payload })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setExpirationTime(expirationTime)
    .sign(secret);
};

export const verifyJwt = async (token: string) => {
  return await jose.jwtVerify(token, secret);
};
