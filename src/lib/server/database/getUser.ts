import { eq, and } from "drizzle-orm";
import { db } from "./db";
import { usersTable } from "./schema";
import { fail } from "@sveltejs/kit";

export async function getUser(user_id: string | number, name: string | undefined) {
  if (!user_id && !name) {
    return fail(400, { user_id, name, success: false, missing: true });
  }
  const user = await db
    .select({
      user_id: usersTable.id,
      name: usersTable.name,
      color: usersTable.color,
    })
    .from(usersTable)
    .where(
      and(
        user_id ? eq(usersTable.id, user_id) : undefined,
        name ? eq(usersTable.name, name) : undefined,
      )
    )

  return user.at(0);
}
