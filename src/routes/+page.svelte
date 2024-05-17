<script language="ts">
  export let data;
</script>

<div class="parent">
  <div class="child">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </div>
</div>

<style>
  p {
    font-size: xx-large;
  }

  .parent {
    /* height: 80vh; */
    margin-top: 5vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: scroll;
  }
  
  .child {
    width: 80vw;
    border-style: solid;
    border-color: lightblue;
    border-radius: 20px;
    border-width: 1px;
    padding: 20px;
    margin: 5px;
    opacity: 80%;
    backdrop-filter: blur(20px);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.65);
  }
</style>
