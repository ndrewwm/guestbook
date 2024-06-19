import { json } from "@sveltejs/kit";
import { createEvent } from "$lib/server/database/crudEvent.js";
import { db } from "$lib/server/database/db.js";
import { eventsTable } from "$lib/server/database/schema.js";

export async function GET() {
  let data = await db
    .select({
      name: eventsTable.name,
      sdt: eventsTable.sdt,
      edt: eventsTable.edt,
      color: eventsTable.color,
    })
    .from(eventsTable);

  return json(data);
}


export async function POST({ request }) {
  let data = await request.json();
  console.log(data);
  let event = await createEvent(data);
  return json({ message: "Event created." }, { status: 201 });
}
