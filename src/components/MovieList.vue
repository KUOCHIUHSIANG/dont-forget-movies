<template>
  <div class="movie-list">
    <div class="movie-list__title">{{ title }}</div>
    <div class="movie-list__ul-container">
      <ul class="movie-list__list" ref="listScroll">
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
      <div class="previous" @click="scrollLeft">
        <font-awesome-icon icon="fa-solid fa-caret-left" />
      </div>
      <div class="next" @click="scrollRight">
        <font-awesome-icon icon="fa-solid fa-caret-right" />
      </div>
    </div>    
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
    scrollLeft() {
      let ulWidth = this.$refs.listScroll.clientWidth
      
      if (ulWidth <= 555) {
        this.$refs.listScroll.scrollLeft -= 568;
      } else if (ulWidth > 555 && ulWidth <= 745) {
        this.$refs.listScroll.scrollLeft -= 510;
      } else if (ulWidth > 745 && ulWidth <= 747) {
        this.$refs.listScroll.scrollLeft -= 766;
      } else if (ulWidth > 747 && ulWidth <= 901) {
        this.$refs.listScroll.scrollLeft -= 682;
      } else if (ulWidth > 901 && ulWidth <= 971) {
        this.$refs.listScroll.scrollLeft -= 910;
      } else if (ulWidth > 971 && ulWidth <= 991) {
        this.$refs.listScroll.scrollLeft -= 794;
      } else if (ulWidth > 991) {
        this.$refs.listScroll.scrollLeft -= 992;
      } 
    },
    scrollRight() {
      let ulWidth = this.$refs.listScroll.clientWidth
      
      if (ulWidth <= 555) {
        this.$refs.listScroll.scrollLeft += 568;
      } else if (ulWidth > 555 && ulWidth <= 745) {
        this.$refs.listScroll.scrollLeft += 510;
      } else if (ulWidth > 745 && ulWidth <= 747) {
        this.$refs.listScroll.scrollLeft += 766;
      } else if (ulWidth > 747 && ulWidth <= 901) {
        this.$refs.listScroll.scrollLeft += 682;
      } else if (ulWidth > 901 && ulWidth <= 971) {
        this.$refs.listScroll.scrollLeft += 910;
      } else if (ulWidth > 971 && ulWidth <= 991) {
        this.$refs.listScroll.scrollLeft += 794;
      } else if (ulWidth > 991) {
        this.$refs.listScroll.scrollLeft += 992;
      } 
    }
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

.movie-list {
  &__ul-container {
    position: relative;
    &:hover {
      .previous, .next {
        opacity: 1;
      }
    }
    ul {
      scroll-behavior: smooth;
    }
    .previous, .next {
      position: absolute;
      top: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      opacity: 0;
      cursor: pointer;
      svg {
        width: 30%;
        height: 30%;
        color: #ffffffaa;
        transition: all .3s ease 0s;
        z-index: 9;
      }
    }
    .previous {
      left: 0;
    }
    .next {
      right: 0;
    }
    .previous::before, .next::before { 
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      content: '';
      opacity: 0;
      transition: all .3s ease 0s; 
    }
    .previous::before {
      left: 0;
      background: linear-gradient(to right, #000000, transparent);
    }
    .next::before {
      right: 0;
      background: linear-gradient(to left, #000000, transparent);
    }
    .previous:hover, .next:hover {
      &::before {
        opacity: 1;
      }
      svg {
        width: 50%;
        height: 50%;
        color: $brand-sub-purple;
      }
    }
  }
}
</style>