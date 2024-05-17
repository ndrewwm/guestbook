import dayjs from "dayjs";
import { z } from "zod";

const Event = z.object({
  name: z.string(),
  start: z.string().date(),
  end: z.string().date(),
});

export type Event = z.infer<typeof Event>;

export class Day {
  date: string;
  events: Event[];
  weekday: string;
  inMonth: boolean;

  constructor(date: string, events: Event[], month: string, year: string) {
    this.date = date;
    this.events = events;
    this.weekday = dayjs(date).format("dd");
    this.inMonth = dayjs(this.date).isSame(dayjs(`${year}-${month}-01`), "month");
  }
}
