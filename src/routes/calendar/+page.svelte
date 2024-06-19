<script lang="ts">
  import Calendar from "./Calendar.svelte";
  import ConfirmSubmit from "./ConfirmSubmit.svelte";
  import { djs as dayjs } from "$lib/util/dayjs";
  export let data;
  export let form;

  let today = dayjs();
  let year: string;
  let month: string;

  // FIXME: This isn't working smoothly, having to resort to using JSON.parse()
  // Data looks like normal JSON when hitting the API, but sveltekit is complaining on load
  let events = JSON.parse(data.events);

  let formOpen = false;
  function toggleRequestForm() {
    formOpen = !formOpen;
  }

  let submitted = 0;
  function handleSubmit() {
    if (form?.success) {
      submitted += 1;
      setTimeout(toggleRequestForm, 1200);
      submitted += 1;
    }
  }
</script>

<div class="selector">
  <select name="months" id="months" bind:value={month}>
    {#each dayjs.months() as month}
      <option value="{month}" selected={month === today.format("MMMM")}>{month}</option>
    {/each}
  </select>

  <select name="years" id="years" bind:value={year}>
    {#each [2024, 2025, 2026, 2027, 2028] as year}
      <option value="{year}" selected={year === today.year()}>{year}</option>
    {/each}
  </select>

  {#if !formOpen}
    <button on:click={toggleRequestForm}>Request</button>
  {:else}
    <form class="request" method="POST" action="?/request">
      <label for="start">Start:
        <input type="date" id="start" name="start" min={today.format("YYYY-MM-DD")} required>
      </label>
      
      <label for="end">End:
        <input type="date" id="end" name="end" min={today.format("YYYY-MM-DD")} required>
      </label>
      <input type="submit" on:click={handleSubmit}>
      <button on:click={toggleRequestForm}>Cancel</button>
    </form>
  {/if}
</div>

{#key year + month}
  <Calendar {year} {month} {events} />
{/key}

<style>
  .selector {
    margin: 10px;
    padding: 10px;
    opacity: 95%;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.582);
    background: rgba(255, 255, 255, 0.9);
    border-radius: 16px;
    display: inline-block;
  }

  .request {
    margin-left: 10px;
    display: inline-block;
  }

  label {
    font-weight: bold;
  }
</style>
