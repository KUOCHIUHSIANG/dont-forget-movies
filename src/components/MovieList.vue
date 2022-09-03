<template>
  <div class="movie-list">
    <div class="movie-list__title">{{ title }}</div>
    <ul class="movie-list__list">
      <LoadingSpinner v-if="!movies || movies.length < 1" />
      <li v-for="movie in movies" :key="movie.id" class="list-item">
        <router-link
          :to="{ name: 'movie-detail', params: { id: movie.id } }"
          v-if="movie.posterPath"
          class="item-wrapper"
        >
          <div class="hover-wrapper" @click="showModal(movie.id)">
            <div class="movie-poster">
              <img
                :src="movie.posterPath | fullyImagePath"
                alt="poster"
                class="poster"
              />
              <div
                class="movie-detail-header-add-button button-size"
                v-if="!movie.inToWatch"
                @click.stop.prevent="addToWatch(movie)"
              >
                ＋
              </div>
              <div
                class="movie-detail-header-delete-button button-size"
                v-else
                @click.stop.prevent="deleteToWatch(movie)"
              >
                ✔
              </div>
            </div>
            <div class="movie-info">
              <div class="movie-info__movie-title">{{ movie.title }}</div>
              <div class="movie-info__movie-original-title">
                {{ movie.originalTitle }}
              </div>
              <div class="movie-info__movie-release-date">
                上映日期：<span>{{ movie.releaseDate }}</span>
              </div>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mixinFilter } from "../utils/mixin";
import LoadingSpinner from "./LoadingSpinner.vue";

export default {
  components: {
    LoadingSpinner,
  },
  mixins: [mixinFilter],
  props: {
    initialTitle: {
      type: String,
      required: true,
    },
    initialMovies: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      movies: this.initialMovies,
      title: this.initialTitle,
    };
  },
  methods: {
    showModal(movieId) {
      this.$emit("after-show-modal", movieId);
    },
    addToWatch(movie) {
      this.$emit("after-add-to-watch", movie);
    },
    deleteToWatch(movie) {
      this.$emit("after-delete-to-watch", movie);
    },
  },
  watch: {
    initialMovies(newValue) {
      this.movies = newValue;
    },
    initialTitle(newValue) {
      this.title = newValue;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/movie-list-shared-style.scss";
</style>