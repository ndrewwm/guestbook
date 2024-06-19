import { eq, and } from "drizzle-orm";
import { db } from "./db";
import { InsertEvent, eventsTable } from "./schema";

export async function createEvent(data: InsertEvent) {
  let event = await db
    .insert(eventsTable)
    .values(data)
    .returning({ id: eventsTable.id });

  return event.at(0);
}

export async function approveEvent(event_id: string | null | undefined) {
  if (!event_id) {
    return null;
  }

  let update = await db
    .update(eventsTable)
    .set({ approved: 1 })
    .where(eq(eventsTable.id, event_id))
    .returning({ id: eventsTable.id });

  return update.at(0);
}

export async function rejectEvent(event_id: string) {
  if (!event_id) {
    return null;
  }

  let deleted = await db
    .delete(eventsTable)
    .where(
      and(
        eq(eventsTable.id, event_id),
        eq(eventsTable.approved, 0),
      )
    )
    .returning({ id: eventsTable.id });

  return deleted.at(0);
}
