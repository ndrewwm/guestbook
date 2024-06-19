import { json } from "@sveltejs/kit";
import { db } from "$lib/server/database/db.js";
import { eq, and } from "drizzle-orm";
import { createEvent } from "$lib/server/database/crudEvent.js";
import { eventsTable } from "$lib/server/database/schema.js";

export async function GET({ url }) {
  const approved = url.searchParams.get("approved");
  const user_id = url.searchParams.get("user_id");
  const name = url.searchParams.get("name");

  let data = await db
    .select()
    .from(eventsTable)
    .where(
      and(
        approved ? eq(eventsTable.approved, approved) : undefined,
        user_id ? eq(eventsTable.user_id, user_id) : undefined,
        name ? eq(eventsTable.name, name) : undefined,
      )
    );

  return json(data);
}


export async function POST({ request }) {
  let data = await request.json();
  let event = await createEvent(data);
  return json({ message: "Event created." }, { status: 201 });
}
