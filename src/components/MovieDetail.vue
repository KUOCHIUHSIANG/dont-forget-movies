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
              backdropFilter(movie.backdrop_path) +
              ')',
          }"
        >
          <div class="movie-detail-header-title-wrapper">
            <div class="movie-title">{{ movie.title }}</div>
            <div class="movie-original-title">{{ movie.original_title }}</div>
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
                  >{{ movie.release_date }}
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
        backdrop_path: "",
        genres: [],
        belongs_to_collection: {},
        title: "",
        original_title: "",
        release_date: "",
        runtime: 0,
        overview: "",
        vote_average: 0,
        vote_count: 0,
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
    backdropFilter(backdrop_path) {
      if (!backdrop_path) {
        return this.emptyBackdrop;
      } else {
        return this.imageBaseURL + backdrop_path;
      }
    },
    closeModal() {
      this.$emit("after-close-modal");
      // this.isLoading = true;
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
      let average = (Math.round(this.movie.vote_average * 10) / 10).toString();
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
@import "../assets/scss/variable.scss";

.modal {
  display: block;
}

.modal-content {
  background-color: #181818;
  height: 85vh;
  .movie-detail-header {
    flex: 1 1 65%;
    position: relative;
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    padding: 1rem 1rem;
    height: 300px;
    border-top-left-radius: calc(0.3rem - 1px);
    border-top-right-radius: calc(0.3rem - 1px);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    &-title-wrapper {
      font-size: 2.25rem;
      line-height: 1.5;
      max-width: 75%;
      .movie-title {
        font-weight: 700;
      }
      .movie-original-title {
        color: $original-movie-title;
        font-size: 0.6em;
        font-weight: 300;
      }
    }
    &-close-button {
      position: absolute;
      top: 0;
      right: 0;
      margin: 1em;
      cursor: pointer;
      background-color: #181818;
      border-radius: 50%;
      height: 36px;
      width: 36px;
      line-height: 36px;
      text-align: center;
      &:hover {
        background-color: #3c3c3c;
      }
    }
    .button-size {
      width: 31px;
      height: 31px;
      line-height: calc(31px - 2px);
      text-align: center;
      border-radius: 50%;
      border: 1px solid #3c3c3c;
      background-color: #3c3c3c2c;
      margin-left: 10px;
      cursor: pointer;
      &:hover {
        border: 1px solid #fff;
      }
    }
  }

  .modal-body {
    flex: 1 2 35%;
    span.info-title {
      color: #777777;
    }

    span.comma:not(:last-child)::after {
      content: "、";
    }

    .movie-info {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      line-height: 1.8;
      .movie-genres {
        max-width: 70%;
      }
    }

    .movie-vote {
      font-size: 12px;
      color: $vote-color;
      &-average {
        font-size: 16px;
      }
    }

    .movie-vote-empty {
      font-size: 12px;
      color: #777777;
    }

    .movie-cast {
      span.comma:nth-last-child(2)::after {
        content: " ";
        margin-right: 0.5em;
      }
      .movie-cast-view {
        cursor: pointer;
        color: $brand-sub-purple;
        &:hover {
          color: $original-movie-title;
          text-decoration: underline;
        }
      }
    }

    .movie-vote,
    .movie-vote-empty,
    p.movie-overview,
    .movie-cast,
    .movie-collection-list__title {
      margin: 20px 0;
      line-height: 1.5;
    }

    .movie-info,
    p.movie-overview,
    .movie-cast {
      font-weight: 300;
    }

    ul.movie-collection-list__list {
      display: flex;
      flex-wrap: wrap;
      li.list-item {
        margin: 0 0.8em 0.8em 0;
        width: 150px;
        .hover-wrapper {
          cursor: pointer;
          .movie-poster {
            width: 150px;
            height: 225px;
            margin-bottom: 0.5em;
          }
          .movie-info {
            flex-direction: column;
            align-items: center;
            text-align: center;
            line-height: 1.5;
            &__movie-original-title {
              color: $original-movie-title;
            }
          }
        }
      }
    }
  }
}

/* media query */
// Small devices , > 576px
@media screen and (min-width: 576px) {
  .modal-dialog {
    max-width: 95%;
  }
}

// Medium devices , > 768px
@media screen and (min-width: 768px) {
  .modal-dialog {
    max-width: 70%;
  }
}

// Large devices , > 992px
@media screen and (min-width: 992px) {
  .modal-dialog {
    max-width: 65%;
  }
}

// Extra large devices , > 1200px
@media screen and (min-width: 1200px) {
  .modal-dialog {
    max-width: 50%;
  }
}
</style>