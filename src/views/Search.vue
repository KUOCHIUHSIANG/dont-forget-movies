<template>
  <div class="container py-5 movie-list">
    <div class="movie-list__title">
      您搜尋的關鍵字 {{ keyword }} ，搜尋結果為：
    </div>
    <LoadingSpinner v-if="isLoading" />
    <div v-if="searchResult.length === 0 && !isLoading" class="empty-result">
      搜尋不到電影
    </div>
    <ListTemplateVue
      v-else-if="!isLoading"
      :initial-movies="searchResult"
      :initial-to-watch-movies="toWatchMovies"
      @after-add-to-watch="afterAddToWatch"
      @after-delete-to-watch="afterDeleteToWatch"
    />
  </div>
</template>

<script>
import ListTemplateVue from "../components/ListTemplate.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import moviesAPI from "../apis/movies";

const STORAGE_KEY = "to-watch-movies";

export default {
  created() {
    this.keyword = this.$route.query.keyword;
    this.searchMovie(this.keyword);
    this.toWatchMovies = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  },
  components: {
    ListTemplateVue,
    LoadingSpinner,
  },
  data() {
    return {
      keyword: "",
      toWatchMovies: [],
      searchResult: [],
      isLoading: true,
    };
  },
  methods: {
    async searchMovie(keyword) {
      try {
        this.keyword = keyword;
        const { data } = await moviesAPI.searchMovie({ keyword });

        this.searchResult = data.results.map((movie) => ({
          id: movie.id,
          posterPath: movie.poster_path,
          title: movie.title,
          originalTitle: movie.original_title,
          releaseDate: movie.release_date,
          inToWatch: false,
        }));
        this.searchResult = this.filterToWatch(this.searchResult);
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log("error", error);
      }
    },
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
      this.searchResult = this.filterToWatch(this.searchResult);
    },
    afterDeleteToWatch(movie) {
      movie.inToWatch = false;
      this.toWatchMovies = this.toWatchMovies.filter(
        (toWatchMovie) => toWatchMovie.id !== movie.id
      );
      this.searchResult = this.filterDeleteToWatch(movie.id, this.searchResult);
    },
    filterToWatch(unfilteredMovies) {
      let filteredToWatchMovies = unfilteredMovies.map((movie) => {
        if (this.toWatchMovies.length > 0) {
          for (let i = 0; i < this.toWatchMovies.length; i++) {
            if (movie.id === this.toWatchMovies[i].id) {
              movie.inToWatch = true;
            }
          }
          return movie;
        } else {
          return movie;
        }
      });

      return filteredToWatchMovies;
    },
    filterDeleteToWatch(movieId, unfilteredMovies) {
      let filteredToWatchMovies = unfilteredMovies.map((unfilteredMovie) => {
        if (unfilteredMovie.id === movieId) {
          return {
            ...unfilteredMovie,
            inToWatch: false,
          };
        } else {
          return unfilteredMovie;
        }
      });

      return filteredToWatchMovies;
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
  beforeRouteUpdate(to, from, next) {
    this.isLoading = true;
    const keyword = to.query.keyword;
    this.searchMovie(keyword);
    next();
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/movie-list-shared-style.scss";

.movie-list {
  max-width: 1040px;
  font-size: 0.9rem;
  .empty-result {
    font-size: 1rem;
    text-align: center;
    padding: 5rem 0;
    color: #ffffff77;
  }
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