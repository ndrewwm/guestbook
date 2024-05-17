<script>
  export let form;
</script>

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
  
<style>
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
    opacity: 80%;
    backdrop-filter: blur(8px);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
    border-radius: 16px;
  }

  label {
    font-weight: bold;
    display: inline-block;
    text-align: left;
    width: 65px;
    margin-right: 15px;
  }

  input {
    margin-bottom: 5px;
    min-width: 180px;
    border-width: 1px;
    opacity: 70%;
  }

  button {
    margin-top: 7px;
    border-width: 1px;
  }
</style>
