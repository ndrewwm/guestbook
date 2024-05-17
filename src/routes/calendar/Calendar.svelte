<script lang="ts">
  // Essentially worked from this REPL as a base: https://svelte.dev/repl/7626cce5508d4a73a6fe9d851e54d79a?version=4.2.0
  import dayjs from "dayjs";
  import type { Event } from "./calendar";
  import { Day } from "./calendar";

  export let month: string;
  export let year: string;
  export let events: Event[];
  const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  function createDays() {
    let firstDayOfMonth = dayjs(`${year}-${month}-01`);
    let firstDayOfWeek = dayjs(firstDayOfMonth).format("dd");
    let weekdayIndex = weekdays.indexOf(firstDayOfWeek);
    let calendarStartDate = dayjs(firstDayOfMonth).subtract(weekdayIndex, 'day');

    let days: Day[] = [];
    for (let i = 0; i < 35; i++) {
      let date = dayjs(calendarStartDate).add(i, "day").format("YYYY-MM-DD");
      let day = new Day(date, events, month, year);
      days = [...days, day];
    }

    return days;
  }

  let days = createDays();
</script>

<div class="calendar">
  <div class="calendar-head">
    <!-- <div class="monthName">{calendarMonth}, {calendarYear}</div> -->
  </div>
  <div class="calendar-body">
    <div class="weekdays">
      {#each weekdays as weekday}
        <div class="weekday">{weekday}</div>
      {/each}
    </div>
    <div class="days">
      {#each days as day}
        <div class="day">
          <div class="dateContainer">
            <div class="date">
              {dayjs(day.date).format("D")}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>


<style>
  .calendar {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    padding: 0 1em;
  }

  .calendar-head {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  /* .monthName {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.125em;
  } */

  .weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    justify-items: center;
  }

  .weekday {
    padding: 1em 0;
    border-radius: 16px;
  }

  .days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    justify-items: stretch;
  }

  .day {
    display: flex;
    flex-direction: column;
    height: 4.5em;
    align-items: center;
    gap: 0.5em;
    cursor: pointer;
  }
</style>
