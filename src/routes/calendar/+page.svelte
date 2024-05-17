<script>
  import dayjs from "dayjs";
  import Calendar from "./Calendar.svelte";

  // TODO: replace with data from the backend
  let events = [
    // Before current month
    { name: "Emily", start: "2024-04-29", end: "2024-05-02" },

    // Overlaps with me
    { name: "Amanda", start: "2024-05-14", end: "2024-05-17" },
    { name: "Andrew", start: "2024-05-17", end: "2024-05-18" },

    // No overlap
    { name: "Tyler", start: "2024-05-28", end: "2024-05-30"},

    // Extends outside current month
    { name: "Larry", start: "2024-05-31", end: "2024-06-03"},
  ];

  let today = dayjs();
  $: month = today.format("MMMM");
  $: year = today.format("YYYY");

  function nextMonth() {
    today = today.add(1, "month");
  }

  function prevMonth() {
    today = today.subtract(1, "month");
  }

  function getCurrentDate() {
    today = dayjs();
  }
</script>

<div class="parent">
  <div class="child">
    <div class="buttons">
      <button on:click={prevMonth}>⬅️</button>
      {month}, {year}
      <button on:click={nextMonth}>➡️</button>
      <button on:click={getCurrentDate}>Today</button>
      
      <label for="switch">
        List
        <input type="checkbox" name="list" id="list">
      </label>
    </div>
    
    {#key today}
      <Calendar {month} {year} {events} />
    {/key}
  </div>
</div>

<style>
  .parent {
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .child {
    color: white;
    opacity: 90%;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
    border-radius: 16px;
  }

  .buttons {
    /* margin-top: 15px; */
    padding-top: 10px;
    padding-left: 15px;
  }
</style>
