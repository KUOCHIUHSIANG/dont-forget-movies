<template>
  <div class="footer-container">
    <footer class="footer">
      <div class="info">
        <a
          href="https://github.com/KUOCHIUHSIANG/dont-forget-movies"
          target="_blank"
          class="github"
        >
          ©2022 Jater Kuo
        </a>
      </div>
      <div class="powered">
        Powered by
        <div class="logo-container">
          <a
            href="https://www.themoviedb.org/documentation/api"
            target="_blank"
          >
            <img src="../assets/images/TMDBlogo.svg" alt="" />
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/variable.scss";

a,
a:hover,
a:focus {
  color: $text-main;
}

.footer-container {
  background-color: $brand-purple;
  min-width: 460px;
  footer.footer {
    height: 5rem;
    margin: 0 auto;
    padding: 0.5rem 1rem;
    max-width: 1200px;
    display: flex;
    justify-content: center;
    align-items: center;

    .info {
      margin-right: 2rem;
      a {
        color: #ffffff77;
        &:hover {
          color: $text-main;
        }
      }
    }
    .powered {
      color: #ffffff77;
      display: flex;
      align-items: center;
      .logo-container {
        width: 100px;
        margin-left: 0.5rem;
      }
    }
  }
}
</style>