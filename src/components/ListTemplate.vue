<template>
  <div class="container">
    <ul class="movie-list__list">
      <li v-for="movie in emptyPosterFilter" :key="movie.id" class="list-item">
        <a
          data-toggle="modal"
          data-target="#movie-detail"
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
        </a>
      </li>
    </ul>
    <div class="modal fade" tabindex="-1" id="movie-detail">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div v-if="isLoading" class="modal-content">
          <LoadingSpinner />
          <div class="movie-detail-header-close-button" data-dismiss="modal">
            ✕
          </div>
        </div>
        <div v-else class="modal-content">
          <div
            class="movie-detail-header"
            :style="{
              backgroundImage:
                'linear-gradient(transparent, #181818) , url(' +
                backdropFilter(movie.backdrop_path) +
                ')',
            }"
          >
            <div class="movie-detail-header-title-wrapper">
              <div class="movie-title">{{ movie.title }}</div>
              <div class="movie-original-title">{{ movie.originalTitle }}</div>
            </div>
            <div
              class="movie-detail-header-add-button button-size"
              v-if="!movie.inToWatch"
              @click="addToWatch(movie)"
            >
              ＋
            </div>
            <div
              class="movie-detail-header-delete-button button-size"
              v-else
              @click="deleteToWatch(movie)"
            >
              ✔
            </div>
            <div class="movie-detail-header-close-button" data-dismiss="modal">
              ✕
            </div>
          </div>
          <div class="modal-body" ref="modalBody">
            <div class="movie-detail-body">
              <div class="movie-info">
                <div class="movie-info-wrapper">
                  <div class="release-date">
                    <span class="info-title">上映日期：</span
                    >{{ movie.releaseDate }}
                  </div>
                  <div class="runtime">
                    <span class="info-title">片長：</span>{{ runtimeConverter }}
                  </div>
                </div>
                <div class="movie-genres">
                  <span class="info-title">類型：</span>
                  <span
                    class="comma"
                    v-for="genre in movie.genres"
                    :key="genre.id"
                    >{{ toTC(genre.name) }}</span
                  >
                </div>
              </div>
              <div class="movie-vote" v-if="movie.vote_count !== 0">
                平均獲得<span class="movie-vote-average">
                  {{ voteAverageConverter }} </span
                >分（<span class="movie-vote-count">{{ movie.vote_count }}</span
                >個評分）
              </div>
              <div class="movie-vote-empty" v-else>目前尚無評分</div>

              <div class="movie-overview">
                <span class="info-title">電影簡介：</span>
                <p class="movie-overview" v-if="movie.overview">
                  {{ movie.overview }}
                </p>
                <p class="movie-overview" v-else>尚無電影簡介</p>
              </div>
              <div class="movie-cast">
                <span class="info-title">演員：</span>
                <span v-if="castSlice.length === 0">尚未提供</span>
                <span class="comma" v-for="cast in castSlice" :key="cast.id">{{
                  cast.name
                }}</span>
                <span
                  class="movie-cast-view"
                  v-if="castSlice.length === 5 && movie.credits.cast.length > 5"
                  @click="moreCast()"
                  >查看全部...</span
                >
                <span
                  class="movie-cast-view"
                  v-if="castSlice.length > 5"
                  @click="lessCast()"
                  >收合</span
                >
              </div>
              <div class="movie-collection-list" v-if="collectionData">
                <div class="movie-collection-list__title">
                  <span class="info-title">相關系列：</span>
                </div>
                <ul class="movie-collection-list__list">
                  <li
                    class="list-item"
                    v-for="collection in collectionData"
                    :key="collection.id"
                  >
                    <div
                      @click="scrollToTop(collection.id)"
                      class="hover-wrapper"
                    >
                      <div class="movie-poster">
                        <img
                          :src="collection.poster_path | fullyImagePath"
                          alt="poster"
                          class="poster"
                        />
                      </div>
                      <div class="movie-info">
                        <div class="movie-info__movie-title">
                          {{ collection.title }}
                        </div>
                        <div class="movie-info__movie-original-title">
                          {{ collection.original_title }}
                        </div>
                        <div class="movie-info__movie-release-date">
                          上映日期：<span>{{ collection.release_date }}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toTC } from "../utils/traditionalized";
import { mixinFilter } from "../utils/mixin";
import moviesAPI from "../apis/movies";
import LoadingSpinner from "../components/LoadingSpinner.vue";

export default {
  mixins: [mixinFilter],
  components: {
    LoadingSpinner,
  },
  props: {
    initialMovies: {
      type: Array,
      required: true,
    },
    initialToWatchMovies: {
      type: Array,
      required: true,
    },
  },
  created() {
    this.toWatchMovies = this.initialToWatchMovies;
  },
  data() {
    return {
      movies: this.initialMovies,
      toWatchMovies: [],
      imageBaseURL: "https://image.tmdb.org/t/p/w1280",
      emptyBackdrop: require("@/assets/images/empty-backdrop.png"),
      movie: {},
      castSlice: [],
      collectionData: [],
      isLoading: true,
    };
  },
  methods: {
    async showModal(movieId) {
      try {
        this.isLoading = true;

        const { data, status, statusText } = await moviesAPI.getMovieDetail({
          movieId,
        });

        if (status !== 200) {
          throw new Error(statusText);
        }

        this.movie = {
          ...this.movie,
          id: data.id,
          backdrop_path: data.backdrop_path,
          posterPath: data.poster_path,
          genres: data.genres,
          belongs_to_collection: data.belongs_to_collection,
          title: data.title,
          originalTitle: data.original_title,
          releaseDate: data.release_date,
          runtime: data.runtime,
          overview: data.overview,
          vote_average: data.vote_average,
          vote_count: data.vote_count,
          credits: data.credits,
          inToWatch: false,
        };

        if (this.toWatchMovies.length > 0) {
          for (let i = 0; i < this.toWatchMovies.length; i++) {
            if (Number(movieId) === this.toWatchMovies[i].id) {
              this.movie.inToWatch = true;
            }
          }
        }

        if (data.belongs_to_collection) {
          let collectionId = data.belongs_to_collection.id;
          const response = await moviesAPI.getCollection({ collectionId });
          this.collectionData = response.data.parts.filter(
            (collection) => collection.id !== this.movie.id
          );
        } else {
          this.collectionData = null;
        }

        this.castSlice = this.movie.credits.cast.slice(0, 5);
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log("error", error);
      }
    },
    backdropFilter(backdrop_path) {
      if (!backdrop_path) {
        return this.emptyBackdrop;
      } else {
        return this.imageBaseURL + backdrop_path;
      }
    },
    toTC,
    lessCast() {
      this.castSlice = this.movie.credits.cast.slice(0, 5);
    },
    moreCast() {
      this.castSlice = this.movie.credits.cast;
    },
    addToWatch(movie) {
      this.$emit("after-add-to-watch", movie);
    },
    deleteToWatch(movie) {
      this.$emit("after-delete-to-watch", movie);
    },
    scrollToTop(movieId) {
      this.$refs.modalBody.scrollTo(0, 0);
      this.showModal(movieId);
    },
  },
  computed: {
    runtimeConverter() {
      if (this.movie.runtime === 0) {
        return "尚未提供";
      } else {
        const quotient = Math.floor(this.movie.runtime / 60).toString();
        const remainder = (this.movie.runtime % 60).toString();
        const convertedRuntime = quotient + " 時 " + remainder + " 分 ";
        return convertedRuntime;
      }
    },
    voteAverageConverter() {
      let average = (Math.round(this.movie.vote_average * 10) / 10).toString();
      if (average.indexOf(".") < 0) {
        average += ".0";
        return average;
      } else {
        return average;
      }
    },
    emptyPosterFilter() {
      return this.movies.filter((movie) => {
        return movie.posterPath;
      });
    },
  },
  watch: {
    initialMovies(newValue) {
      this.movies = newValue;
    },
    initialToWatchMovies(newValue) {
      this.toWatchMovies = newValue;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/movie-list-shared-style.scss";

// modal css
@import "../assets/scss/movie-detail-modal-shared-style.scss";

ul {
  flex-wrap: wrap;
}

a:hover {
  cursor: pointer;
}

.modal {
  display: none;
  &-body {
    font-size: 1rem;
  }
}
</style>