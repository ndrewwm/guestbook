import { redirect, fail } from '@sveltejs/kit';
import { djs as dayjs } from '$lib/util/dayjs.js';
import { verifyAuthJWT } from '$lib/server/jwt.js';

export async function load({ cookies, fetch }) {
  const token = cookies.get("auth_token");
  if (!token) {
    throw redirect(301, "/login");
  }
  const user = await verifyAuthJWT(token);
  console.log(user);

  const data = await fetch(`/api/calendar`);
  let events = await data.json();
  return { events: JSON.stringify(events) };
}

export const actions = {
  request: async ({ cookies, request }) => {
    const data = await request.formData();
    const sdt = data.get('start');
    const edt = data.get('end');

    if (dayjs(sdt) > dayjs(edt)) {
      return fail(400, { sdt, edt, success: false, invalid: true });
    }

    console.log(cookies.get("auth_token"));

    return { success: true }
  }
}