import { error } from "@sveltejs/kit";
import { djs as dayjs } from "$lib/util/dayjs";

export type CalItem = {
  type: "date" | "event",
  name: string;
  sdt: dayjs.Dayjs | string;
  edt: dayjs.Dayjs | string;
  in_month?: boolean | undefined;
  color?: string | undefined;
  duration?: number | undefined,
  b_sdt: dayjs.Dayjs | undefined;
  b_edt: dayjs.Dayjs | undefined;
  row_start?: number | undefined;
  col_start?: number | undefined;
  row_end?: number | undefined;
  col_end?: number | undefined;
  grid_area?: string | undefined;
}

function createDays(year: string, month: string) {
  // Given the month/year, establish start/end
  let mon1 = dayjs(`${year}-${month}-01`);
  let mon31 = mon1.endOf("month");

  // Determine the month's first Monday
  let day1 = mon1.subtract(mon1.day() - 1, "day");

  // TODO: this may not be correct
  // The first Monday of a month might not be the first day used in the calendar
  if (day1.day() !== 1) {
    day1 = day1.subtract(7, "day");
  }

  // Get the final Sunday that would appear on the calendar
  let day31 = mon31.add(7 - mon31.day(), "day");
  let nday = day31.diff(day1, "day");

  // Create an array of days over the full span
  let days: CalItem[] = [];
  for (let i = 0; i <= nday; i++) {
    let date = day1.add(i, "day");
    
    days = [
      ...days,
      {
        type: "date",
        name: date.date().toString(),
        in_month: date.month() === mon1.month(),
        sdt: date,
        edt: date,
        duration: 0,
        col_start: (date.weekday() + 1) * 2,
        col_end: date.weekday() * 2,
        b_sdt: date,
        b_edt: date,
      },
    ];
  }

  return days;
}

export function prepareEvents(events: CalItem[]) {
  for (let event of events) {
    event.type = "event";
    event.sdt = dayjs(event.sdt);
    event.b_sdt = event.sdt;
    event.edt = dayjs(event.edt);
    event.b_edt = event.edt;
    event.duration = event.edt.diff(event.sdt, "day");
    event.col_start = event.sdt.weekday() * 2 + 1;
    event.col_end = event.edt.weekday() * 2 + 3;
  }
  return events;
}

export function createDivs(year: string, month: string, events: CalItem[]) {
  events = events
    .filter((event) => {
      let starts_in = event.sdt.format("MMMM") === month;
      let ends_in = event.edt.format("MMMM") === month;
      return starts_in || ends_in;
    })
    .map((event) => {
      // If the event doesn't span over a weekend, just return it
      if (event.duration! < 7 && event.col_start! < event.col_end!) {
        return event;
      }

      let d = Math.floor(event.duration! / 7);
      if (d <= 1) {
        let next = Object.assign({}, event);
        next.b_sdt = next.edt.weekday(1);
        next.col_start = 1;

        event.b_edt = event.sdt.weekday(7);
        event.col_end = 7 * 2 + 1;

        return [event, next];
      }

      let out: CalItem[] = [];
      return out;
    })
    .flat();

  let days = createDays(year, month);
  let data = days.concat(events).sort((a, b) => a.b_sdt.unix() - b.b_sdt.unix());

  // We should always be working with a multiple of 7
  if (days.length % 7 !== 0) {
    throw error(500);
  }

  // Work through the items to programmatically assemble the grid-area rule
  let day = 0;
  let row_day = 2;
  let row_evt = row_day;
  for (let item of data) {
    if (item.type === "date") {
      if (day === 7) {
        row_day = row_evt + 1;
        row_evt = row_day;
        day = 0;
      }
      item.row_start = row_day;
      item.row_end = row_day;

      // row / col-end
      item.grid_area = `grid-area: ${item.row_start} / ${item.col_start};`;
      day += 1;
    }

    if (item.type === "event") {
      row_evt += 1;
      item.row_start = row_evt;
      item.row_end = row_evt;

      // row-start, col-start, row-end, col-end
      item.grid_area = `grid-area: ${item.row_start} / ${item.col_start} / ${item.row_end} / ${item.col_end};`;
    }
    
  }

  return data;
}
