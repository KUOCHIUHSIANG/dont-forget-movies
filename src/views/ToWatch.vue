<template>
  <div class="container py-5 movie-list">
    <div class="movie-list__title">待看清單</div>
    <ul class="movie-list__list">
      <li v-for="movie in toWatchList" :key="movie.id" class="list-item">
        <a
          data-toggle="modal"
          data-target="#movie-detail"
          v-if="movie.posterPath"
          class="item-wrapper"
        >
          <div
            class="hover-wrapper"
          >
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
    <div class="modal" tabindex="-1" id="movie-detail">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
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
            <div class="movie-detail-header-close-button" data-dismiss="modal">
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
  </div>
</template>

<script>
import { toTC } from "../utils/traditionalized";
import { mixinFilter } from "../utils/mixin";

const STORAGE_KEY = "to-watch-movies";

const dummyData = {
  adult: false,
  backdrop_path: "/34hxgcQLgVBE6yZemjjWMoPQlTj.jpg",
  belongs_to_collection: null,
  budget: 0,
  genres: [
    {
      id: 14,
      name: "奇幻",
    },
    {
      id: 35,
      name: "喜剧",
    },
  ],
  homepage: "",
  id: 47852,
  imdb_id: "tt0056844",
  original_language: "cs",
  original_title: "Až přijde kocour",
  overview:
    "魔法師來到小鎮，他有隻戴著墨鏡的貓，一旦摘下，貓眼看人，便得現出原形：偽善的變紫色，不忠的是黃色，小偷成為灰色，而紅色則是戀愛中人。孩子們很樂，大人們卻雞飛狗跳。為了不被看穿，他們非把魔法師的貓抓起來不可。",
  popularity: 3.979,
  poster_path: "/e3mTcLdLCAs3aEgNarX70D2mipw.jpg",
  production_companies: [
    {
      id: 1931,
      logo_path: null,
      name: "Filmové studio Barrandov",
      origin_country: "XC",
    },
  ],
  production_countries: [
    {
      iso_3166_1: "XC",
      name: "Czechoslovakia",
    },
  ],
  release_date: "1963-09-20",
  revenue: 0,
  runtime: 105,
  spoken_languages: [
    {
      english_name: "Czech",
      iso_639_1: "cs",
      name: "Český",
    },
  ],
  status: "Released",
  tagline: "",
  title: "魔法師的貓",
  video: false,
  vote_average: 6.5,
  vote_count: 21,
  credits: {
    cast: [
      {
        adult: false,
        gender: 2,
        id: 134720,
        known_for_department: "Acting",
        name: "Jan Werich",
        original_name: "Jan Werich",
        popularity: 1.217,
        profile_path: "/dEusoR17fbHY19KGUK5Fo31Q7oL.jpg",
        cast_id: 5,
        character: "Magician / Oliva",
        credit_id: "53bc0a530e0a26197c002ff4",
        order: 0,
      },
      {
        adult: false,
        gender: 1,
        id: 235666,
        known_for_department: "Acting",
        name: "Emília Vášáryová",
        original_name: "Emília Vášáryová",
        popularity: 1.4,
        profile_path: "/zv04vLQM3cESlq5Se2nONycVsXa.jpg",
        cast_id: 6,
        character: "Diana",
        credit_id: "53bc0a630e0a26198400309c",
        order: 1,
      },
      {
        adult: false,
        gender: 2,
        id: 11733,
        known_for_department: "Acting",
        name: "Vlastimil Brodský",
        original_name: "Vlastimil Brodský",
        popularity: 4.288,
        profile_path: "/8MwuOKrHCuMLHZ0zxt8obppEyde.jpg",
        cast_id: 7,
        character: "Teacher Robert",
        credit_id: "53bc0a750e0a261974002f30",
        order: 2,
      },
      {
        adult: false,
        gender: 2,
        id: 137020,
        known_for_department: "Acting",
        name: "Jiří Sovák",
        original_name: "Jiří Sovák",
        popularity: 4.049,
        profile_path: "/zVExdaXisVzhcemmye6DoyBFsPu.jpg",
        cast_id: 8,
        character: "School director",
        credit_id: "53bc0a840e0a26198400309f",
        order: 3,
      },
      {
        adult: false,
        gender: 2,
        id: 55732,
        known_for_department: "Acting",
        name: "Vladimír Menšík",
        original_name: "Vladimír Menšík",
        popularity: 5.12,
        profile_path: "/yM705NlRGUOdsoLQz8tBS5Ur4Ka.jpg",
        cast_id: 14,
        character: "School janitor",
        credit_id: "58d81a72c3a368124f05a281",
        order: 4,
      },
      {
        adult: false,
        gender: 1,
        id: 140618,
        known_for_department: "Acting",
        name: "Jiřina Bohdalová",
        original_name: "Jiřina Bohdalová",
        popularity: 1.4,
        profile_path: "/5dHhCDqzCuiUXTvRZ1kGDYk7j0J.jpg",
        cast_id: 15,
        character: "Julie",
        credit_id: "58d81a7b9251411f8905d577",
        order: 5,
      },
      {
        adult: false,
        gender: 2,
        id: 227727,
        known_for_department: "Acting",
        name: "Karel Effa",
        original_name: "Karel Effa",
        popularity: 2.866,
        profile_path: "/azvg0ZZQ6YjRnw6kq1o3jSX1g6R.jpg",
        cast_id: 16,
        character: "Janek",
        credit_id: "58d81a849251411fd505cce6",
        order: 6,
      },
      {
        adult: false,
        gender: 1,
        id: 327724,
        known_for_department: "Acting",
        name: "Vlasta Chramostová",
        original_name: "Vlasta Chramostová",
        popularity: 0.6,
        profile_path: "/8d6k7k9R2KnavlUegnfMZ7uxk0B.jpg",
        cast_id: 17,
        character: "Marjánka",
        credit_id: "58d81a8fc3a368127c058e14",
        order: 7,
      },
      {
        adult: false,
        gender: 1,
        id: 1278855,
        known_for_department: "Acting",
        name: "Alena Kreuzmannová",
        original_name: "Alena Kreuzmannová",
        popularity: 1.96,
        profile_path: "/mbPjJVGGA5syapMIfJiO8HviNFp.jpg",
        cast_id: 18,
        character: "Fancha, Gossip",
        credit_id: "58d81a99c3a368126f0556e6",
        order: 8,
      },
      {
        adult: false,
        gender: 1,
        id: 11686,
        known_for_department: "Acting",
        name: "Stella Zázvorková",
        original_name: "Stella Zázvorková",
        popularity: 0.694,
        profile_path: "/7RP3MMz7fJHPlI5LAY6ZGzh5htb.jpg",
        cast_id: 19,
        character: "Ruzena",
        credit_id: "58d81aa3c3a368126f0556f1",
        order: 9,
      },
      {
        adult: false,
        gender: 2,
        id: 235688,
        known_for_department: "Acting",
        name: "Jaroslav Mareš",
        original_name: "Jaroslav Mareš",
        popularity: 0.6,
        profile_path: "/lrfReVQ1kbaFe9B2bo9FB925ve6.jpg",
        cast_id: 20,
        character: "Restaurant owner",
        credit_id: "58d81aac9251411f8905d5a1",
        order: 10,
      },
      {
        adult: false,
        gender: 1,
        id: 548099,
        known_for_department: "Acting",
        name: "Jana Werichová",
        original_name: "Jana Werichová",
        popularity: 0.6,
        profile_path: null,
        cast_id: 21,
        character: "Chairman's wife",
        credit_id: "58d81ab5925141448e012240",
        order: 11,
      },
      {
        adult: false,
        gender: 2,
        id: 1376404,
        known_for_department: "Acting",
        name: "Ladislav Fialka",
        original_name: "Ladislav Fialka",
        popularity: 0.6,
        profile_path: null,
        cast_id: 22,
        character: "Stealer",
        credit_id: "58d81abec3a368124f05a2d7",
        order: 12,
      },
      {
        adult: false,
        gender: 2,
        id: 1784268,
        known_for_department: "Acting",
        name: "Karel Vrtiška",
        original_name: "Karel Vrtiška",
        popularity: 0.6,
        profile_path: null,
        cast_id: 23,
        character: "Miller",
        credit_id: "58d81ac8925141445f011954",
        order: 13,
      },
      {
        adult: false,
        gender: 2,
        id: 137076,
        known_for_department: "Acting",
        name: "Václav Babka",
        original_name: "Václav Babka",
        popularity: 1.942,
        profile_path: "/joObuPN0Q3SgAtTRlUIY1u4dD4O.jpg",
        cast_id: 61,
        character: "",
        credit_id: "62305c1db0040a00776b6d7c",
        order: 14,
      },
      {
        adult: false,
        gender: 2,
        id: 563091,
        known_for_department: "Acting",
        name: "Michal Pospíšil",
        original_name: "Michal Pospíšil",
        popularity: 0.6,
        profile_path: null,
        cast_id: 62,
        character: "",
        credit_id: "62305c24982f74007bc50605",
        order: 15,
      },
      {
        adult: false,
        gender: 2,
        id: 3461033,
        known_for_department: "Acting",
        name: "Antonín Krčmář",
        original_name: "Antonín Krčmář",
        popularity: 0.6,
        profile_path: null,
        cast_id: 63,
        character: "",
        credit_id: "62305c29b0040a001ef9ec1d",
        order: 16,
      },
      {
        adult: false,
        gender: 2,
        id: 3466253,
        known_for_department: "Acting",
        name: "Pavel Brodský",
        original_name: "Pavel Brodský",
        popularity: 0.6,
        profile_path: null,
        cast_id: 64,
        character: "",
        credit_id: "62305c326d1bb20046eb1099",
        order: 17,
      },
      {
        adult: false,
        gender: 1,
        id: 3466255,
        known_for_department: "Acting",
        name: "Dana Dubanská",
        original_name: "Dana Dubanská",
        popularity: 0.6,
        profile_path: null,
        cast_id: 65,
        character: "",
        credit_id: "62305c4d23a3140076805e35",
        order: 18,
      },
      {
        adult: false,
        gender: 1,
        id: 592084,
        known_for_department: "Acting",
        name: "Alena Bradáčová",
        original_name: "Alena Bradáčová",
        popularity: 0.6,
        profile_path: null,
        cast_id: 66,
        character: "",
        credit_id: "62305c6763aad20044dc9f8b",
        order: 19,
      },
      {
        adult: false,
        gender: 2,
        id: 235657,
        known_for_department: "Acting",
        name: "Vítězslav Černý",
        original_name: "Vítězslav Černý",
        popularity: 0.6,
        profile_path: null,
        cast_id: 67,
        character: "",
        credit_id: "62305c73cc96830046d05de4",
        order: 20,
      },
      {
        adult: false,
        gender: 1,
        id: 2737387,
        known_for_department: "Acting",
        name: "Ludmila Kovářová",
        original_name: "Ludmila Kovářová",
        popularity: 0.6,
        profile_path: null,
        cast_id: 68,
        character: "",
        credit_id: "62305c78be2d49001bcb7dd4",
        order: 21,
      },
      {
        adult: false,
        gender: 2,
        id: 2974128,
        known_for_department: "Acting",
        name: "Miloslav Janovský",
        original_name: "Miloslav Janovský",
        popularity: 0.84,
        profile_path: null,
        cast_id: 69,
        character: "",
        credit_id: "62305c7dc8f85800473023d3",
        order: 22,
      },
      {
        adult: false,
        gender: 2,
        id: 134747,
        known_for_department: "Acting",
        name: "Jiří Kaftan",
        original_name: "Jiří Kaftan",
        popularity: 1.4,
        profile_path: null,
        cast_id: 70,
        character: "",
        credit_id: "62305c82d48cee0045e20d3e",
        order: 23,
      },
      {
        adult: false,
        gender: 1,
        id: 3460086,
        known_for_department: "Acting",
        name: "Zdeňka Kratochvílová",
        original_name: "Zdeňka Kratochvílová",
        popularity: 0.6,
        profile_path: null,
        cast_id: 71,
        character: "",
        credit_id: "62305c886d1bb2001d66fe37",
        order: 24,
      },
      {
        adult: false,
        gender: 1,
        id: 1976189,
        known_for_department: "Writing",
        name: "Hana Lamková",
        original_name: "Hana Lamková",
        popularity: 0.6,
        profile_path: "/stExyBkfUx7pjhTiggRloVif5OD.jpg",
        cast_id: 72,
        character: "",
        credit_id: "62305c8dd46537007a6beb25",
        order: 25,
      },
      {
        adult: false,
        gender: 2,
        id: 1817153,
        known_for_department: "Writing",
        name: "Josef Lamka",
        original_name: "Josef Lamka",
        popularity: 0.6,
        profile_path: "/vdHxB4Tsk55fp0QId1IC1AtLxob.jpg",
        cast_id: 73,
        character: "",
        credit_id: "62305c92d48cee00766b1578",
        order: 26,
      },
      {
        adult: false,
        gender: 1,
        id: 83963,
        known_for_department: "Acting",
        name: "Naděžda Munzarová",
        original_name: "Naděžda Munzarová",
        popularity: 0.6,
        profile_path: null,
        cast_id: 74,
        character: "",
        credit_id: "62305c98d46537004622ba68",
        order: 27,
      },
      {
        adult: false,
        gender: 2,
        id: 3466257,
        known_for_department: "Acting",
        name: "Jiří Středa",
        original_name: "Jiří Středa",
        popularity: 0.6,
        profile_path: null,
        cast_id: 75,
        character: "",
        credit_id: "62305cfb982f7400448a3795",
        order: 28,
      },
      {
        adult: false,
        gender: 1,
        id: 3466258,
        known_for_department: "Acting",
        name: "Eva Středová",
        original_name: "Eva Středová",
        popularity: 0.6,
        profile_path: null,
        cast_id: 76,
        character: "",
        credit_id: "62305d16cc9683001ca889a8",
        order: 29,
      },
      {
        adult: false,
        gender: 2,
        id: 2729403,
        known_for_department: "Art",
        name: "Josef Podsedník",
        original_name: "Josef Podsedník",
        popularity: 0.6,
        profile_path: null,
        cast_id: 77,
        character: "",
        credit_id: "62305d33109dec004620f589",
        order: 30,
      },
      {
        adult: false,
        gender: 1,
        id: 2729404,
        known_for_department: "Art",
        name: "Jaroslava Zelenková",
        original_name: "Jaroslava Zelenková",
        popularity: 0.6,
        profile_path: null,
        cast_id: 78,
        character: "",
        credit_id: "62305d38b0040a00776b6ed9",
        order: 31,
      },
      {
        adult: false,
        gender: 1,
        id: 2524353,
        known_for_department: "Acting",
        name: "Jarmila Orlová",
        original_name: "Jarmila Orlová",
        popularity: 0.98,
        profile_path: null,
        cast_id: 79,
        character: "",
        credit_id: "62305d46cc9683001ca889f2",
        order: 32,
      },
      {
        adult: false,
        gender: 2,
        id: 2033449,
        known_for_department: "Acting",
        name: "Ivan Lukeš",
        original_name: "Ivan Lukeš",
        popularity: 0.6,
        profile_path: null,
        cast_id: 80,
        character: "",
        credit_id: "62305d4cc9054f00453833b7",
        order: 33,
      },
      {
        adult: false,
        gender: 1,
        id: 2702544,
        known_for_department: "Acting",
        name: "Božena Věchetová",
        original_name: "Božena Věchetová",
        popularity: 0.6,
        profile_path: null,
        cast_id: 81,
        character: "",
        credit_id: "62305d52982f74001b25dfd5",
        order: 34,
      },
      {
        adult: false,
        gender: 1,
        id: 2488950,
        known_for_department: "Acting",
        name: "Luka Rubanovičová",
        original_name: "Luka Rubanovičová",
        popularity: 1.4,
        profile_path: null,
        cast_id: 82,
        character: "",
        credit_id: "62305d576d1bb2007a7cefdb",
        order: 35,
      },
      {
        adult: false,
        gender: 2,
        id: 1183347,
        known_for_department: "Acting",
        name: "Josef Pivoňka",
        original_name: "Josef Pivoňka",
        popularity: 0.6,
        profile_path: null,
        cast_id: 83,
        character: "",
        credit_id: "62305d5d63aad2001ba44ffb",
        order: 36,
      },
      {
        adult: false,
        gender: 2,
        id: 1183365,
        known_for_department: "Acting",
        name: "Miloslav Šindler",
        original_name: "Miloslav Šindler",
        popularity: 0.6,
        profile_path: null,
        cast_id: 84,
        character: "",
        credit_id: "62305d64c8f858004730252f",
        order: 37,
      },
      {
        adult: false,
        gender: 1,
        id: 2036935,
        known_for_department: "Acting",
        name: "Luďa Marešová",
        original_name: "Luďa Marešová",
        popularity: 1.38,
        profile_path: null,
        cast_id: 85,
        character: "",
        credit_id: "62305d6a23a3140076805fb7",
        order: 38,
      },
      {
        adult: false,
        gender: 2,
        id: 1620106,
        known_for_department: "Art",
        name: "Vladimír Dvořák",
        original_name: "Vladimír Dvořák",
        popularity: 0.6,
        profile_path: null,
        cast_id: 86,
        character: "",
        credit_id: "62305d74a3e4ba007a0ee89d",
        order: 39,
      },
      {
        adult: false,
        gender: 2,
        id: 2474881,
        known_for_department: "Costume & Make-Up",
        name: "Richard Weber",
        original_name: "Richard Weber",
        popularity: 0.6,
        profile_path: null,
        cast_id: 87,
        character: "",
        credit_id: "62305d7f23a31400455128ad",
        order: 40,
      },
    ],
    crew: [
      {
        adult: false,
        gender: 2,
        id: 4008,
        known_for_department: "Camera",
        name: "Miroslav Ondříček",
        original_name: "Miroslav Ondříček",
        popularity: 1.176,
        profile_path: "/E6UCuYN7k6NIlwpgSFQNEZJG5p.jpg",
        credit_id: "6230599723a314001bad18c9",
        department: "Camera",
        job: "Camera Operator",
      },
      {
        adult: false,
        gender: 2,
        id: 11727,
        known_for_department: "Art",
        name: "Oldřich Bosák",
        original_name: "Oldřich Bosák",
        popularity: 0.656,
        profile_path: null,
        credit_id: "58d819ffc3a3681267053b2e",
        department: "Art",
        job: "Production Design",
      },
      {
        adult: false,
        gender: 2,
        id: 54011,
        known_for_department: "Sound",
        name: "František Belfín",
        original_name: "František Belfín",
        popularity: 0.938,
        profile_path: null,
        credit_id: "62305b406d1bb2001d66fc33",
        department: "Sound",
        job: "Conductor",
      },
      {
        adult: false,
        gender: 2,
        id: 84736,
        known_for_department: "Directing",
        name: "Ivan Passer",
        original_name: "Ivan Passer",
        popularity: 1.96,
        profile_path: "/91qZWu7o9gcjffBEIA9io3Cqgkj.jpg",
        credit_id: "62305933109dec004620ef47",
        department: "Directing",
        job: "First Assistant Director",
      },
      {
        adult: false,
        gender: 2,
        id: 137032,
        known_for_department: "Writing",
        name: "Jiří Brdečka",
        original_name: "Jiří Brdečka",
        popularity: 1.789,
        profile_path: "/nwQKsWmyXf3i4SaykVcfFiIF2H4.jpg",
        credit_id: "62305974c9054f0045382eab",
        department: "Writing",
        job: "Screenplay",
      },
      {
        adult: false,
        gender: 2,
        id: 137071,
        known_for_department: "Directing",
        name: "Vojtěch Jasný",
        original_name: "Vojtěch Jasný",
        popularity: 1.96,
        profile_path: "/cXz5807HlHo5cIiWuaIH4ixlV29.jpg",
        credit_id: "6230596b109dec004620ef91",
        department: "Writing",
        job: "Screenplay",
      },
      {
        adult: false,
        gender: 2,
        id: 137071,
        known_for_department: "Directing",
        name: "Vojtěch Jasný",
        original_name: "Vojtěch Jasný",
        popularity: 1.96,
        profile_path: "/cXz5807HlHo5cIiWuaIH4ixlV29.jpg",
        credit_id: "52fe474ac3a36847f812d5df",
        department: "Directing",
        job: "Director",
      },
      {
        adult: false,
        gender: 2,
        id: 137071,
        known_for_department: "Directing",
        name: "Vojtěch Jasný",
        original_name: "Vojtěch Jasný",
        popularity: 1.96,
        profile_path: "/cXz5807HlHo5cIiWuaIH4ixlV29.jpg",
        credit_id: "62305961cc9683001ca883e0",
        department: "Writing",
        job: "Story",
      },
      {
        adult: false,
        gender: 2,
        id: 140619,
        known_for_department: "Production",
        name: "Bohumil Šmída",
        original_name: "Bohumil Šmída",
        popularity: 0.84,
        profile_path: null,
        credit_id: "62305b71d48cee00766b1344",
        department: "Production",
        job: "Executive Producer",
      },
      {
        adult: false,
        gender: 2,
        id: 223731,
        known_for_department: "Camera",
        name: "Jaroslav Kučera",
        original_name: "Jaroslav Kučera",
        popularity: 1.686,
        profile_path: null,
        credit_id: "58d8186dc3a368126f05550b",
        department: "Camera",
        job: "Director of Photography",
      },
      {
        adult: false,
        gender: 2,
        id: 223731,
        known_for_department: "Camera",
        name: "Jaroslav Kučera",
        original_name: "Jaroslav Kučera",
        popularity: 1.686,
        profile_path: null,
        credit_id: "62305a76982f7400448a3452",
        department: "Crew",
        job: "Special Effects",
      },
      {
        adult: false,
        gender: 2,
        id: 543891,
        known_for_department: "Sound",
        name: "Svatopluk Havelka",
        original_name: "Svatopluk Havelka",
        popularity: 0.6,
        profile_path: null,
        credit_id: "58d81865925141448e011fe6",
        department: "Sound",
        job: "Original Music Composer",
      },
      {
        adult: false,
        gender: 2,
        id: 822754,
        known_for_department: "Editing",
        name: "Jan Chaloupek",
        original_name: "Jan Chaloupek",
        popularity: 0.6,
        profile_path: null,
        credit_id: "58d81882c3a36812340597c4",
        department: "Editing",
        job: "Editor",
      },
      {
        adult: false,
        gender: 2,
        id: 937476,
        known_for_department: "Art",
        name: "Bohumil Nový",
        original_name: "Bohumil Nový",
        popularity: 0.6,
        profile_path: null,
        credit_id: "623059ac982f7400448a32fd",
        department: "Art",
        job: "Assistant Production Design",
      },
      {
        adult: false,
        gender: 2,
        id: 1079012,
        known_for_department: "Acting",
        name: "Antonín Jedlička",
        original_name: "Antonín Jedlička",
        popularity: 3.724,
        profile_path: "/aqBhEGRMZYlH2UX1aoIqNyNocqi.jpg",
        credit_id: "62305a6b0ed2ab0045ed3b55",
        department: "Sound",
        job: "Sound Effects",
      },
      {
        adult: false,
        gender: 2,
        id: 1107757,
        known_for_department: "Directing",
        name: "Ota Koval",
        original_name: "Ota Koval",
        popularity: 0.98,
        profile_path: null,
        credit_id: "6230593c0ed2ab0045ed39fd",
        department: "Directing",
        job: "Assistant Director",
      },
      {
        adult: false,
        gender: 2,
        id: 1136817,
        known_for_department: "Writing",
        name: "Václav Nývlt",
        original_name: "Václav Nývlt",
        popularity: 0.6,
        profile_path: null,
        credit_id: "623059810ed2ab001ceeb213",
        department: "Crew",
        job: "Dramaturgy",
      },
      {
        adult: false,
        gender: 2,
        id: 1136822,
        known_for_department: "Production",
        name: "Miloš Stejskal",
        original_name: "Miloš Stejskal",
        popularity: 0.656,
        profile_path: null,
        credit_id: "62305a9323a3140045512525",
        department: "Production",
        job: "Unit Production Manager",
      },
      {
        adult: false,
        gender: 2,
        id: 1280125,
        known_for_department: "Costume & Make-Up",
        name: "Gustav Hrdlička",
        original_name: "Gustav Hrdlička",
        popularity: 0.6,
        profile_path: null,
        credit_id: "623059efb0040a0048d0631d",
        department: "Costume & Make-Up",
        job: "Makeup & Hair",
      },
      {
        adult: false,
        gender: 2,
        id: 1294943,
        known_for_department: "Sound",
        name: "Dobroslav Šrámek",
        original_name: "Dobroslav Šrámek",
        popularity: 0.6,
        profile_path: null,
        credit_id: "62305a4a23a3140076805ac3",
        department: "Sound",
        job: "Sound",
      },
      {
        adult: false,
        gender: 2,
        id: 1620103,
        known_for_department: "Art",
        name: "Jiří Rulík",
        original_name: "Jiří Rulík",
        popularity: 0.6,
        profile_path: null,
        credit_id: "623059b50ed2ab0045ed3a8d",
        department: "Art",
        job: "Set Decoration",
      },
      {
        adult: false,
        gender: 2,
        id: 1620106,
        known_for_department: "Art",
        name: "Vladimír Dvořák",
        original_name: "Vladimír Dvořák",
        popularity: 0.6,
        profile_path: null,
        credit_id: "623059cfb0040a001ef9e903",
        department: "Costume & Make-Up",
        job: "Costume Design",
      },
      {
        adult: false,
        gender: 2,
        id: 1620106,
        known_for_department: "Art",
        name: "Vladimír Dvořák",
        original_name: "Vladimír Dvořák",
        popularity: 0.6,
        profile_path: null,
        credit_id: "62305a800328b9004623e39b",
        department: "Crew",
        job: "Special Effects",
      },
      {
        adult: false,
        gender: 2,
        id: 1674857,
        known_for_department: "Art",
        name: "Ladislav Krbec",
        original_name: "Ladislav Krbec",
        popularity: 0.6,
        profile_path: null,
        credit_id: "623059bea3e4ba004783e884",
        department: "Art",
        job: "Set Decoration",
      },
      {
        adult: false,
        gender: 2,
        id: 1674866,
        known_for_department: "Production",
        name: "Jaroslav Jílovec",
        original_name: "Jaroslav Jílovec",
        popularity: 0.6,
        profile_path: null,
        credit_id: "62305a8a982f7400448a346d",
        department: "Production",
        job: "Production Manager",
      },
      {
        adult: false,
        gender: 1,
        id: 1777185,
        known_for_department: "Costume & Make-Up",
        name: "Marie Hrdličková",
        original_name: "Marie Hrdličková",
        popularity: 0.6,
        profile_path: null,
        credit_id: "623059f8d46537001bbb4718",
        department: "Costume & Make-Up",
        job: "Makeup & Hair",
      },
      {
        adult: false,
        gender: 2,
        id: 2063993,
        known_for_department: "Costume & Make-Up",
        name: "František Pilný",
        original_name: "František Pilný",
        popularity: 0.6,
        profile_path: null,
        credit_id: "62305a00b0040a0048d0634c",
        department: "Costume & Make-Up",
        job: "Makeup & Hair",
      },
      {
        adult: false,
        gender: 2,
        id: 2089711,
        known_for_department: "Camera",
        name: "Rudolf Milič",
        original_name: "Rudolf Milič",
        popularity: 0.6,
        profile_path: null,
        credit_id: "623059a2109dec0078ae2e9d",
        department: "Camera",
        job: "Assistant Camera",
      },
      {
        adult: false,
        gender: 2,
        id: 2270227,
        known_for_department: "Sound",
        name: "Bohumír Brunclík",
        original_name: "Bohumír Brunclík",
        popularity: 0.6,
        profile_path: null,
        credit_id: "62305a57c3aa3f001cc6a486",
        department: "Sound",
        job: "Sound Effects",
      },
      {
        adult: false,
        gender: 2,
        id: 2270229,
        known_for_department: "Sound",
        name: "Jaromír Svoboda",
        original_name: "Jaromír Svoboda",
        popularity: 0.6,
        profile_path: null,
        credit_id: "62305a61c9054f00755c72d9",
        department: "Sound",
        job: "Sound Effects",
      },
      {
        adult: false,
        gender: 1,
        id: 2470773,
        known_for_department: "Directing",
        name: "Zdenka Pešulová",
        original_name: "Zdenka Pešulová",
        popularity: 0.6,
        profile_path: null,
        credit_id: "6230594fa3e4ba001d032873",
        department: "Directing",
        job: "Assistant Director",
      },
      {
        adult: false,
        gender: 2,
        id: 2479701,
        known_for_department: "Production",
        name: "Jaroslav Koucký",
        original_name: "Jaroslav Koucký",
        popularity: 0.6,
        profile_path: null,
        credit_id: "62305a9c109dec0078ae2fc8",
        department: "Production",
        job: "Unit Production Manager",
      },
      {
        adult: false,
        gender: 1,
        id: 2506304,
        known_for_department: "Directing",
        name: "Zdenka Karlovská",
        original_name: "Zdenka Karlovská",
        popularity: 0.6,
        profile_path: null,
        credit_id: "623059450328b900778cfb57",
        department: "Directing",
        job: "Assistant Director",
      },
      {
        adult: false,
        gender: 2,
        id: 2575021,
        known_for_department: "Costume & Make-Up",
        name: "František Zapletal",
        original_name: "František Zapletal",
        popularity: 0.6,
        profile_path: null,
        credit_id: "623059df6d1bb2001d66f99f",
        department: "Costume & Make-Up",
        job: "Costumer",
      },
      {
        adult: false,
        gender: 2,
        id: 2852889,
        known_for_department: "Camera",
        name: "Karel Ješátko",
        original_name: "Karel Ješátko",
        popularity: 0.6,
        profile_path: null,
        credit_id: "62305b326d1bb2001d66fc25",
        department: "Camera",
        job: "Still Photographer",
      },
      {
        adult: false,
        gender: 2,
        id: 3420976,
        known_for_department: "Writing",
        name: "Ladislav Fikar",
        original_name: "Ladislav Fikar",
        popularity: 0.6,
        profile_path: null,
        credit_id: "62305b68d48cee001c573fb2",
        department: "Writing",
        job: "Creative Producer",
      },
      {
        adult: false,
        gender: 2,
        id: 3423578,
        known_for_department: "Production",
        name: "Pavel Krůta",
        original_name: "Pavel Krůta",
        popularity: 0.6,
        profile_path: null,
        credit_id: "62305aa4c9054f001b0d7e8d",
        department: "Production",
        job: "Assistant Production Manager",
      },
      {
        adult: false,
        gender: 1,
        id: 3430230,
        known_for_department: "Costume & Make-Up",
        name: "Božena Nová",
        original_name: "Božena Nová",
        popularity: 0.6,
        profile_path: null,
        credit_id: "623059e723a314001bad194a",
        department: "Costume & Make-Up",
        job: "Costumer",
      },
      {
        adult: false,
        gender: 1,
        id: 3432045,
        known_for_department: "Directing",
        name: "Eliška Kolaříková",
        original_name: "Eliška Kolaříková",
        popularity: 0.6,
        profile_path: null,
        credit_id: "62305959c8f8580079e2a9f3",
        department: "Directing",
        job: "Assistant Director",
      },
      {
        adult: false,
        gender: 1,
        id: 3466247,
        known_for_department: "Editing",
        name: "Jana Šimůnková",
        original_name: "Jana Šimůnková",
        popularity: 0.6,
        profile_path: null,
        credit_id: "62305a0823a3140045512421",
        department: "Editing",
        job: "Assistant Editor",
      },
      {
        adult: false,
        gender: 1,
        id: 3466249,
        known_for_department: "Production",
        name: "Milada Krůtová",
        original_name: "Milada Krůtová",
        popularity: 0.6,
        profile_path: null,
        credit_id: "62305aad63aad2001ba44ca4",
        department: "Camera",
        job: "Clapper Loader",
      },
      {
        adult: false,
        gender: 2,
        id: 3466250,
        known_for_department: "Lighting",
        name: "František Brůček",
        original_name: "František Brůček",
        popularity: 0.6,
        profile_path: null,
        credit_id: "62305ae0c9054f00755c73b2",
        department: "Lighting",
        job: "Gaffer",
      },
    ],
  },
};

export default {
  created() {
    this.toWatchList = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    this.movie = { ...dummyData };
    this.castSlice = this.movie.credits.cast.slice(0, 5);
    console.log(this.movie);
    console.log(this.castSlice);
  },
  mixins: [mixinFilter],
  data() {
    return {
      toWatchList: [],
      imageBaseURL: "https://image.tmdb.org/t/p/w1280",
      emptyBackdrop: require("@/assets/images/empty-backdrop.png"),
      movie: {},
      castSlice: [],
      // castSlice: this.initialMovie.credits.cast.slice(0, 5),
      collectionData: [
        {
          adult: false,
          backdrop_path: "/c7xTZ9EA6GpH72xJC5s0x0KKR1a.jpg",
          genre_ids: [10751, 16, 12, 35],
          id: 211672,
          original_language: "en",
          original_title: "Minions",
          overview:
            "源起盤古開天時期，剛開始只是一個黃色的有機體，隨­著時間漸漸演化成小小兵種族，它們終身都需要服侍最邪惡的主人們，然而從暴龍到拿破崙，都不小心被他們害死。小小兵們發現自己到後來沒有可以服侍的主人，從此開始鬱鬱寡歡。但其中的一隻，凱文（Kevin）有個偉大的計畫，就是跟著它的好友——叛逆的史都華（Stuart）還有可愛的小蘿蔔（Bob），出走尋找新的邪惡首領。凱文帶領史都華和蘿蔔登上美國紐約，前往奧蘭多參加「大壞蛋博覽會」（Villain-Con）尋找最惡名昭彰的壞蛋，它們因而找到主人：史嘉蕾·殺很大（珊卓·布拉克配音）、是世界女魔頭翹楚，將目標瞄準英女王的王冠，並派小小兵去偷。",
          popularity: 74.403,
          poster_path: "/iA97pZS9FRhBgz5EoVfLFkfJV1P.jpg",
          release_date: "2015-06-17",
          title: "小小兵",
          video: false,
          vote_average: 6.391,
          vote_count: 9479,
        },
        {
          adult: false,
          backdrop_path: "/nmGWzTLMXy9x7mKd8NKPLmHtWGa.jpg",
          genre_ids: [16, 12, 35, 14],
          id: 438148,
          original_language: "en",
          original_title: "Minions: The Rise of Gru",
          overview:
            "美國1970年代中葉，當披頭散髮搭配喇叭牛仔褲的嬉皮風潮仍未褪流行之時，格魯 (史提夫卡爾 配音) 還是一個住在郊區的小屁孩，他也是一個世上最強超級大壞蛋組合“壞壞六人組”的大粉絲，他想出了一個計劃，希望能夠變得夠壞然後加入他們。幸好他有一群忠心耿耿的追隨者小小兵會幫助他大搞破壞。凱文、史都華、蘿蔔和“拖拖”－一個新加入的小小兵，他還在帶牙套而且超想要討他主子的歡心－他們非常有“笑”率地發揮他們各種超ㄎ一ㄤ的技能，和格魯一起打造了他們的第一個邪惡基地、測試他們發明的第一批武器，並且成功完成了他們的第一項邪惡任務。  當“壞壞六人組”把他們的首領威酷魔王 (亞倫阿金 配音) 趕走之後，格魯決定去“壞壞六人組”的辦公室面試，想要成為他們最新的成員，但事情進行得並不順利 (簡直是一場大災難) ，而且情況愈變愈糟，因為格魯用他聰明的小腦袋呼嚨了他們，然後就突然發現自己成為世上最邪惡組合“壞壞六人組”的死對頭。於是格魯就不得不落跑，他在跑路的時候向誰都料想不到的一個人請求指導，那就是被趕出“壞壞六人組”的威酷魔王本人，並且領悟到就算是宇宙超級無敵大壞蛋也需要朋友的幫助。",
          popularity: 2775.34,
          poster_path: "/zgqc54bmp6KcaKvjqqLphEQ9qBP.jpg",
          release_date: "2022-06-29",
          title: "小小兵2：格魯的崛起",
          video: false,
          vote_average: 7.708,
          vote_count: 1684,
        },
      ],
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
    toTC,
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
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/MovieListSharedStyle.scss";

.movie-list {
  max-width: 1024px;
  font-size: 0.9rem;
}

ul {
  flex-wrap: wrap;
}

a:hover {
  cursor: pointer;
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