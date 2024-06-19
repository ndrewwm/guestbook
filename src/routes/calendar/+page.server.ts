import { fail } from '@sveltejs/kit';
import { djs as dayjs } from '$lib/util/dayjs.js';

export async function load({ fetch }) {
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

    console.log(cookies.getAll());

    return { success: true }
  }
}