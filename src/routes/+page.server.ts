import { verifyAuthJWT } from "$lib/server/jwt";
import { redirect } from "@sveltejs/kit";
import { getWeather } from "$lib/server/weather";

export async function load({ cookies }) {
  const token = cookies.get("auth_token");

  if (!token) {
    throw redirect(301, "/login");
  }

  // TODO: check the store
  // if (!fresh) {
    // Fetch the weather
    // const weather = await getWeather();
  // }

  return verifyAuthJWT(token);
}
