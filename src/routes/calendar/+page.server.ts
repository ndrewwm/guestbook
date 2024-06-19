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

  const data_approved = await fetch(`/api/calendar?approved=1`);
  const approved = await data_approved.json();

  const data_unapproved = await fetch(`/api/calendar?approved=0&user_id=${user.id}`);
  const unapproved = await data_unapproved.json();

  const events = approved.concat(unapproved);
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
