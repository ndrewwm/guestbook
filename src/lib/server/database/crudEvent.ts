import { eq } from "drizzle-orm";
import { db } from "./db";
import { InsertEvent, SelectEvent, eventsTable } from "./schema";

export async function createEvent(data: InsertEvent) {
  let event = await db
    .insert(eventsTable)
    .values(data)
    .returning({ id: eventsTable.id });

    return event.at(0);
}
