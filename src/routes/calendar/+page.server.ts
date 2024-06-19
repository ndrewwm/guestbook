import { redirect } from '@sveltejs/kit';
import { verifyAuthJWT } from '$lib/server/jwt.js';
import { getUser } from '$lib/server/database/getUser.js';
import { createEvent } from '$lib/server/database/crudEvent.js';

export async function load({ cookies, fetch }) {
  const token = cookies.get("auth_token");
  if (!token) {
    throw redirect(301, "/login");
  }
  const user = await verifyAuthJWT(token);

  const data = await fetch(`/api/calendar`);
  let events = await data.json();
  return { events: JSON.stringify(events) };
}

export const actions = {
  request: async ({ cookies, request }) => {
    const data = await request.formData();
    const sdt = data.get('start');
    const edt = data.get('end');
    const payload = await verifyAuthJWT(cookies.get("auth_token"));
    const user = await getUser(payload.id, undefined);
    const event = {
      user_id: user.user_id,
      name: user.name,
      color: user.color,
      approved: 0,
      sdt,
      edt,
    };

    const resp = await createEvent(event);
    return { success: true, event_id: resp.id };
  }
}
