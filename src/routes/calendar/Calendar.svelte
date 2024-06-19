<script lang="ts">
  import { createDivs, prepareEvents } from "./createDivs";
  import type { CalItem } from "./createDivs";

  export let year: string;
  export let month: string;
  export let events: CalItem[];

  events = prepareEvents(events);
  let items = createDivs(year, month, events);
  let rows = items.map((item) => item.row_start).at(-1);

  function provideStyle(item: CalItem) {
    if (item.type === "date") {
      return item.grid_area;
    }

    let style = item.grid_area;
    if (item.type === "event") {
      style += `${item.grid_area} background: ${item.color};`;
    } else {
      style += `
        ${item.grid_area}
        background: repeating-linear-gradient(-45deg, ${item.color}, black 10%);
        color: white;
      `;
    }
    return style;
  }
</script>

<div class="calendar" style="grid-template-rows: repeat({rows + 1}, 0.4fr);">
  <span class="d-1"></span>
  <span class="d-2"></span>
  <span class="d-3"></span>
  <span class="d-4"></span>
  <span class="d-5"></span>
  <span class="d-6"></span>
  <h3 class="h-mon">mon</h3>
  <h3 class="h-tue">tue</h3>
  <h3 class="h-wed">wed</h3>
  <h3 class="h-thu">thu</h3>
  <h3 class="h-fri">fri</h3>
  <h3 class="h-sat">sat</h3>
  <h3 class="h-sun">sun</h3>

  {#each items as item}
    {#if item.type === "date"}
      <div class="date" style="{provideStyle(item)}">{item.name}</div>
    {:else}
      <div class="{item.type}" style="{provideStyle(item)}">
        {item.name}{item.approved === 1 ? "" : " (requested)"}
      </div>
    {/if}
  {/each}
</div>

<style>
  .arrow {
    border: none;
    background: none;
  }

  .calendar {
    color: black;
    font-weight: bolder;
    display: grid;
    grid-template-columns: repeat(14, 1fr); /* 14 columns: start/end for 7 days */
    grid-gap: 10px 0;
    min-height: 70vh;
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    margin: 0 auto;
    opacity: 95%;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.582);
    background: rgba(255, 255, 255, 0.9);
    border-radius: 16px;
  }

  .calendar > .event,
  .calendar > .unapproved {
    margin-left: 2px;
    margin-right: 2px;
    padding: 8px;
    padding-left: 20px;
    border-radius: 20px;
  }

  /* .calendar > .date {
    border: solid;
    border-width: 0.5px;
    border-radius: 300%;
  } */

  span {
    border-left: 1px solid grey;
    grid-row: 1 / -1;
  }
  span.d-1 {
    grid-column: 3;
  }
  span.d-2 {
    grid-column: 5;
  }
  span.d-3 {
    grid-column: 7;
  }
  span.d-4 {
    grid-column: 9;
  }
  span.d-5 {
    grid-column: 11;
  }
  span.d-6 {
    grid-column: 13;
  }

  /* These are the headings, the days of the week. They span 2 columns each. */
  h3 {
    text-align: center;
    grid-row: 1;
  }
  h3.h-mon {
    grid-column: 1 / span 2;
  }
  h3.h-tue {
    grid-column: 3 / span 2;
  }
  h3.h-wed {
    grid-column: 5 / span 2;
  }
  h3.h-thu {
    grid-column: 7 / span 2;
  }
  h3.h-fri {
    grid-column: 9 / span 2;
  }
  h3.h-sat {
    grid-column: 11 / span 2;
  }
  h3.h-sun {
    grid-column: 13 / span 2;
  }
</style>