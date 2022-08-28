<template>
  <div class="movie-list">
    <div class="movie-list__title">{{ title }}</div>
    <ul class="movie-list__list">
      <li v-for="movie in movies" :key="movie.id" 
      class="list-item">
        <router-link :to="{ name: 'movie-detail', params: { id: movie.id }}" v-if="movie.posterPath"  class="item-wrapper"> 
          <div class="hover-wrapper"  @click="showModal(movie.id)">
            <div class="movie-poster">
              <img
                :src="movie.posterPath | fullyImagePath"
                alt="poster"
                class="poster"
              />
              <div class="movie-detail-header-add-button button-size" v-if="!movie.inToWatch" @click.stop.prevent="addToWatch(movie)">＋</div>
              <div class="movie-detail-header-delete-button button-size" v-else @click.stop.prevent="deleteToWatch(movie)">✔</div>
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
import { mixinFilter } from '../utils/mixin'

export default {
  mixins: [ mixinFilter ],
  props: {
    initialTitle: {
      type: String,
      required: true
    },
    initialMovies: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      movies: this.initialMovies,
      title: this.initialTitle
    }
  },
  methods: {
    showModal(movieId) {
      this.$emit('after-show-modal', movieId)
    },
    addToWatch(movie) {
      this.$emit('after-add-to-watch', movie)
    },
    deleteToWatch(movie) {
      this.$emit('after-delete-to-watch', movie)
    }
  },
  watch: {
    initialMovies(newValue) {
      this.movies = newValue
    },
    initialTitle(newValue) {
      this.title = newValue
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
a,
a:hover,
a:focus {
  color: $text-main;
}

a .hover-wrapper {
  transform: scale(1);
  transition: transform 0.2s ease-in-out;
}
a:hover .hover-wrapper {
  box-shadow: 0px 3px 5px #ffffff55;
  transform: scale(1.05);
  transition: transform 0.2s ease-in-out;
}

.movie-list {
  margin: 0 auto;
  max-width: 992px;
  font-size: 1rem;
  &__title {
    color: $brand-sub-purple;
    font-size: 1.5rem;
    margin-left: 0.6em;
  }
  ul.movie-list__list {
    display: flex;
    overflow: auto;
    padding: 0.8em 0;
    li.list-item {
      margin: 0.6em;
      .movie-poster {
        width: 16.56em;
        height: 23.56em;
        position: relative;
        .button-size {
          position: absolute;
          top: 1rem;
          right: 1rem;
          height: 2rem;
          width: 2rem;
          line-height: calc(2rem - 1px);
          text-align: center;
          border-radius: 50%;
          border: 1px solid #3c3c3c;
          background-color: #3c3c3c5c;
          margin-left: 10px;
          cursor: pointer;
          &:hover {
            border: 1px solid #fff;
          }
        }
      }
      
      .movie-info {
        line-height: 1.5;
        padding: 0.7em 0.5em 0.5em;
        &__movie-title {
          font-size: 1.2em;
          font-weight: 500;
        }
        &__movie-original-title {
          font-size: 0.94em;
          color: $original-movie-title;
        }
        &__movie-release-date {
          font-size: 0.94em;
          color: #FFFFFFaa;
        }
      }
    }
  }
}

/* media query */
// Small devices , > 576px 
@media screen and (min-width: 576px) {
  .movie-list {
    font-size: 0.9rem;
  }
}

// Medium devices , > 768px
@media screen and (min-width: 768px) {
  .movie-list {
    font-size: 0.8rem;
  }
}

// Large devices , > 992px
@media screen and (min-width: 992px) {
  .movie-list {
    font-size: 0.7rem;
  }
}
</style>