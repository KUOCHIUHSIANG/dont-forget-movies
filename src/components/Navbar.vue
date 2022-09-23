<template>
  <div class="nav-container">
    <nav class="navbar navbar-expand-lg navbar-dark">
      <router-link class="navbar-brand" to="/">Don’t Forget !</router-link>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/dont-forget-movies/to-watch"
            >To Watch</router-link
          >
        </li>
      </ul>
      <form
        class="form-inline search-form my-2 my-lg-0"
        @submit.stop.prevent="searchMovies"
        :class="{ 'search-active': searchActive }"
      >
        <input
          v-model="keyword"
          @focus="searchFocus"
          @blur="searchBlur"
          class="search-input mr-sm-2"
          type="search"
          placeholder="請輸入電影名稱"
          aria-label="Search"
        />
        <div @click="searchMovies" class="search-icon-wrapper">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </div>
      </form>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
      searchActive: false,
    };
  },
  methods: {
    searchFocus() {
      this.searchActive = true;
    },
    searchBlur() {
      this.searchActive = false;
    },
    searchMovies() {
      if (this.keyword.length === 0) {
        return;
      }
      console.log("想搜尋的關鍵字為：" + this.keyword);
      document.activeElement.blur();

      this.$router.push({ name: "search", query: { keyword: this.keyword } });

      this.keyword = "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variable.scss";
@import url("https://fonts.googleapis.com/css2?family=Splash&display=swap");

.nav-container {
  background-color: $brand-purple;
  min-width: 460px;
  nav.navbar {
    height: 3.75rem;
    margin: 0 auto;
    max-width: 1200px;
  }
}

.navbar-brand {
  user-select: none;
  font-family: "Splash", cursive;
  color: #daa520;
  &:focus {
    color: #daa520;
  }
}

form.search-form {
  font-size: 0.9em;
  &:hover {
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  }
  &.search-active {
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  }
  input.search-input {
    background-color: transparent;
    border: 0;
    outline: none; /* 外框效果 */
    color: #fff;
    margin: 0 6px 0 12px;

    &::placeholder {
      color: #fff;
      opacity: 0.6;
    }
  }
  .search-icon-wrapper {
    margin-right: 12px;
    cursor: pointer;
  }
}

/* media query */
// Small devices , > 576px
@media screen and (min-width: 576px) {
  .navbar-brand {
    font-size: 1.4em;
  }
  form.search-form {
    font-size: inherit;
  }
}

// Medium devices , > 768px
@media screen and (min-width: 768px) {
  .navbar-brand {
    font-size: 1.8em;
  }
}

// Large devices , > 992px
// @media screen and (min-width: 992px) { ... }

// Extra large devices , > 1200px
// @media screen and (min-width: 1200px) { ... }
</style>