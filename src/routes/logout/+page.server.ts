import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
  cookies.set("auth_token", "", { path: "/" });
  throw redirect(301, "/login");
}
