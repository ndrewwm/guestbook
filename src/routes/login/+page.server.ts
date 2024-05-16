import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/database/db';
import { usersTable } from '$lib/server/database/schema';
import { createAuthJWT } from '$lib/server/jwt';
import { oneOrNull } from '$lib/server/database/oneOrNull.js';
import * as argon from "argon2";

export async function load({ cookies }) {
  const token = cookies.get("auth_token");
  if (token && token !== "") {
    throw redirect(301, "/");
  }
}

export const actions = {
  login: async function({ cookies, request }) {
    const data = await request.formData();
    const email = data.get("email");
    const password = data.get("password");

    if (!email || !password) {
      return fail(400, { email, missing: true });
    }

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email.toString()))
      .then(oneOrNull);

    if (!user) {
      return fail(404, { email, incorrect: true });
    }

    const password_valid = await argon.verify(
      user.password,
      password.toString(),
    );

    if (!password_valid) {
      return fail(401, { email, incorrect: true });
    }

    const token = await createAuthJWT({
      name: user.name,
      email: user.email,
      id: user.id,
    });
    cookies.set("auth_token", token, { path: "/", maxAge: 60 * 60 });

    throw redirect(301, "/");
  },
  // register: async (event) => {

  // },
};
