<template>
  <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #572d88;">
    <a class="navbar-brand" href="#">Don’t Forget !</a>
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" href="#">To Watch</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="search-input mr-sm-2" type="search" placeholder="請輸入電影名稱" aria-label="Search">
      <div class="search-icon-wrapper">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
      </div>
    </form>
  </nav>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Splash&display=swap');

.navbar-brand {
  user-select: none;
  font-family: 'Splash', cursive;
}


// Small devices , > 576px 
@media screen and (min-width: 576px) {
  .navbar-brand {
    font-size: 1.4em;
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