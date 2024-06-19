import { approveEvent } from '$lib/server/database/crudEvent.js';
import { json } from '@sveltejs/kit';


export async function POST({ url }) {
  const event_id = url.searchParams.get("id");
  if (!event_id) {
    return json({ message: "Provide an event_id." }, { status: 400 });
  }

  const result = await approveEvent(event_id);
  if (result === undefined || result === null) {
    return json({ message: `event_id ${event_id} not found.` }, { status: 400 });
  }

  return json({ status: 200, message: "Approved." });
}
