<template>
  <div class="container py-5 movie-list">
    <div class="movie-list__title">待看清單</div>
    <ListTemplateVue
      :initial-movies="toWatchMovies"
      :initial-to-watch-movies="toWatchMovies"
      @after-add-to-watch="afterAddToWatch"
      @after-delete-to-watch="afterDeleteToWatch"
    />
  </div>
</template>

<script>
import ListTemplateVue from "../components/ListTemplate.vue";

const STORAGE_KEY = "to-watch-movies";

export default {
  created() {
    this.toWatchMovies = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  },
  components: {
    ListTemplateVue,
  },
  data() {
    return {
      toWatchMovies: [],
    };
  },
  methods: {
    saveStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.toWatchMovies));
    },
    afterAddToWatch(movie) {
      movie.inToWatch = true;
      const listMovie = {
        id: movie.id,
        title: movie.title,
        originalTitle: movie.originalTitle,
        posterPath: movie.posterPath,
        releaseDate: movie.releaseDate,
        inToWatch: movie.inToWatch,
      };

      this.toWatchMovies.push(listMovie);
    },
    afterDeleteToWatch(movie) {
      movie.inToWatch = false;
      this.toWatchMovies = this.toWatchMovies.filter(
        (toWatchMovie) => toWatchMovie.id !== movie.id
      );
    },
  },
  watch: {
    toWatchMovies: {
      handler: function () {
        this.saveStorage();
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/movie-list-shared-style.scss";

.movie-list {
  max-width: 1040px;
  font-size: 0.9rem;
}

/* media query */
// Small devices , > 576px
@media screen and (min-width: 576px) {
  .movie-list {
    font-size: 0.8rem;
  }
}

// Medium devices , > 768px
@media screen and (min-width: 768px) {
  .movie-list {
    font-size: 0.7rem;
  }
}
</style>