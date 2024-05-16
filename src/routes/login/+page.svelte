<script>
  export let form;
</script>

<html lang="en" class="all">
  <div class="parent">
    <div class="child">
      <form method="post" action="?/login">
        {#if form?.missing}
        <p class="error">Email and password required.</p>
        {/if}
        {#if form?.incorrect}
        <p class="error">Invalid credentials!</p>
        {/if}
        <label for="email">Email</label>
        <input name="email" type="email" value={form?.email ?? ""} />
        <br />
        <label for="password">Password</label>
        <input type="password" name="password" />
        <br />
        <button>Log in</button>
      </form>
    </div>
  </div>
</html>
  
<style>
  .all {
    width: 100vw;
    height: 100vh;
    background-image: url("../../lib/images/lake_fog.jpg");
    background-size: 1600px;
  }

  .parent {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .child {
    margin-top: 200px;
    border-style: solid;
    border-color: lightblue;
    border-radius: 20px;
    border-width: 1px;
    padding: 20px;
    background-color: lightblue;
    opacity: 80%;
  }

  label {
    font-weight: bold;
    display: inline-block;
    /* float: left; */
    text-align: left;
    width: 65px;
  }

  input {
    margin-bottom: 5px;
    min-width: 180px;
    border-width: 1px;
    opacity: 70%;
  }

  button {
    /* border-radius: 7px; */
    margin-top: 7px;
    border-width: 1px;
  }
</style>
