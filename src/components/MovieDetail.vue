<template>
  <div class="modal" tabindex="-1" id="movie-detail">
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
      v-click-outside="closeModal"
    >
      <div class="modal-content">
        <div
          class="movie-detail-header"
          :style="{
            backgroundImage:
              'linear-gradient(transparent, #181818) , url(' +
              backdropFilter(movie.backdropPath) +
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
          <div class="movie-detail-header-close-button" @click="closeModal">
            ✕
          </div>
        </div>
        <div class="modal-body">
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
            <div class="movie-vote" v-if="movie.voteCount !== 0">
              平均獲得<span class="movie-vote-average">
                {{ voteAverageConverter }} </span
              >分（<span class="movie-vote-count">{{ movie.voteCount }}</span
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
                  <div class="hover-wrapper">
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
</template>

<script>
import { toTC } from "../utils/traditionalized";
import { mixinFilter } from "../utils/mixin";

export default {
  mixins: [mixinFilter],
  props: {
    initialMovie: {
      type: Object,
      default: () => ({
        id: 0,
        backdropPath: "",
        genres: [],
        belongsToCollection: {},
        title: "",
        originalTitle: "",
        releaseDate: "",
        runtime: 0,
        overview: "",
        voteAverage: 0,
        voteCount: 0,
        credits: {
          cast: [],
        },
        inToWatch: false,
      }),
    },
    initialCollectionData: {
      type: Array,
    },
  },
  data() {
    return {
      imageBaseURL: "https://image.tmdb.org/t/p/w1280",
      emptyBackdrop: require("@/assets/images/empty-backdrop.png"),
      movie: {
        ...this.initialMovie,
      },
      castSlice: this.initialMovie.credits.cast.slice(0, 5),
      collectionData: this.initialCollectionData,
    };
  },
  methods: {
    backdropFilter(backdropPath) {
      if (!backdropPath) {
        return this.emptyBackdrop;
      } else {
        return this.imageBaseURL + backdropPath;
      }
    },
    closeModal() {
      this.$emit("after-close-modal");
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
  },
  watch: {
    initialMovie(newValue) {
      this.movie = {
        ...this.movie,
        ...newValue,
      };
    },
    initialCollectionData(newValue) {
      this.collectionData = newValue;
    }
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
      let average = (Math.round(this.movie.voteAverage * 10) / 10).toString();
      if (average.indexOf(".") < 0) {
        average += ".0";
        return average;
      } else {
        return average;
      }
    },
  }
};
</script>
>

<style lang="scss" scoped>
@import "../assets/scss/movie-detail-modal-shared-style.scss"
</style>