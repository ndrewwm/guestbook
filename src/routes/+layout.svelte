<script>
  export let data;
  import "$lib/styles.css";
</script>

<nav>
  <div class="nav-left">
    <a href="/">Home 🏠</a>
    <a href="/documents">Docs 📄</a>
    <a href="/calendar">Calendar 📅</a>
    <a href="/guestbook">Guestbook 📔</a>
  </div>

  <div class="nav-right">
    {#if data.token && data.token !== ""}
      <a href="/logout">Log out</a>
    {/if}
  </div>
</nav>

<slot />

<footer>
  <div class="footer-left"></div>
  <div class="footer-right">
    Warm Lake, 9/15/2023 <br>
    Built with ❤️ using SvelteKit. Contact GitHub
  </div>
</footer>

<style>
  /* This has been useful: https://css.glass/ */
  nav {
    font-size: larger;
    font-weight: bolder;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    backdrop-filter: blur(5.9px);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
  }

  a {
    text-decoration: none;
    color: skyblue;
    margin-left: 6px;
  }

  a:hover {
    text-decoration: underline;
  }

  footer {
    position: absolute;
    bottom: 0;
    width: 99vw;
    color: black;
    font-size: small;
    font-weight: bolder;
    display: flex;
    text-align: right;
    justify-content: space-between;
  }

  .footer-right {
    backdrop-filter: blur(3.9px);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
  }
</style>
