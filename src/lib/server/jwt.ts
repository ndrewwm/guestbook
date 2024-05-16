import { SECRET_JWT_KEY } from "$env/static/private";
import { error } from "@sveltejs/kit";
import * as jose from "jose";

// Credit to https://github.com/bmdavis419/svelte-go-testing/tree/main

type JWTPayload = {
  name: string;
  email: string;
  id: number;
};

export async function createAuthJWT(data: JWTPayload) {
  const jwt = await new jose.SignJWT(data)
    .setProtectedHeader({ alg: "HS256" })
    .sign(new TextEncoder().encode(SECRET_JWT_KEY));

  return jwt;
}

export async function verifyAuthJWT(token: string) {
  try {
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(SECRET_JWT_KEY)
    );
    return payload as JWTPayload;
  } catch {
    throw error(401, "Invalid or missing JWT.");
  }
};
