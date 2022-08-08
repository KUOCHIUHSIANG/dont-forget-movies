<template>
  <div class="container py-5">
    <MovieList :initialMovies="trendingMovies" :initialTitle="trendingTitle" @after-show-modal="afterShowModal"/>
    <MovieList :initialMovies="onShowMovies" :initialTitle="onShowTitle" @after-show-modal="afterShowModal"/>
    <MovieList :initialMovies="comingMovies" :initialTitle="comingTitle" @after-show-modal="afterShowModal"/>
    <MovieList
      :initialMovies="popularityMovies"
      :initialTitle="popularityTitle"
      @after-show-modal="afterShowModal"
    />
    <!-- modal -->
    <router-view v-if="modalVisibility" @after-close-modal="afterCloseModal" :initialMovie="movie" :initialCollectionData="collectionData"/>
    <div class="modal-backdrop" v-if="modalVisibility"></div>
  </div>
</template>

<script>
import moviesAPI from "../apis/movies";
import MovieList from "../components/MovieList.vue";

export default {
  components: {
    MovieList,
  },
  created() {
    this.getToday();
    this.fetchTrending();
    this.fetchOnShow();
    this.fetchComing();
    this.fetchPopularity();
  },
  data() {
    return {
      trendingMovies: [],
      onShowMovies: [],
      comingMovies: [],
      popularityMovies: [],
      trendingTitle: "本週熱門",
      onShowTitle: "現正上映",
      comingTitle: "即將上映",
      popularityTitle: "近期受歡迎",
      today: "",
      modalVisibility: false,
      fetchMovieId: 0,
      movie: {
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
        credits: {},
      },
      collectionData: []
    };
  },
  methods: {
    getToday() {
      const date = new Date();
      const year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      if (month < 10) {
        month = 0 + month.toString();
      }
      if (day < 10) {
        day = 0 + day.toString();
      }
      this.today = year + "-" + month + "-" + day;    
    },
    async fetchTrending() {
      try {
        const { data } = await moviesAPI.getTrending();
        this.trendingMovies = data.results.map((movie) => ({
          id: movie.id,
          posterPath: movie.poster_path,
          title: movie.title,
          originalTitle: movie.original_title,
          releaseDate: movie.release_date,
        }));
      } catch (error) {
        console.log("error", error);
      }
    },
    async fetchOnShow() {
      const { data } = await moviesAPI.getOnShow({ lte: this.today });
      this.onShowMovies = data.results.map((movie) => ({
        id: movie.id,
        posterPath: movie.poster_path,
        title: movie.title,
        originalTitle: movie.original_title,
        releaseDate: movie.release_date,
      }));
    },
    async fetchComing() {
      const { data } = await moviesAPI.getComing({ gte: this.today });
      this.comingMovies = data.results.map((movie) => ({
        id: movie.id,
        posterPath: movie.poster_path,
        title: movie.title,
        originalTitle: movie.original_title,
        releaseDate: movie.release_date,
      }));
    },
    async fetchPopularity() {
      const { data } = await moviesAPI.getPopularity();
      this.popularityMovies = data.results.map((movie) => ({
        id: movie.id,
        posterPath: movie.poster_path,
        title: movie.title,
        originalTitle: movie.original_title,
        releaseDate: movie.release_date,
      }));
    },
    async afterShowModal(movieId) {
      this.fetchMovieId = movieId
      const { data } = await moviesAPI.getMovieDetail({ movieId })   
      console.log(data);
      this.movie = {
        ...this.movie,
        id: data.id,
        backdrop_path: data.backdrop_path,
        genres: data.genres,
        belongs_to_collection: data.belongs_to_collection,
        title: data.title,
        original_title: data.original_title,
        release_date: data.release_date,
        runtime: data.runtime,
        overview: data.overview,
        vote_average: data.vote_average,
        vote_count: data.vote_count,
        credits: data.credits,
      }

      if (data.belongs_to_collection) {
        let collectionId = data.belongs_to_collection.id
        const response = await moviesAPI.getCollection({ collectionId })
        this.collectionData = response.data.parts.filter(collection => collection.id !== this.movie.id)
      } else {
        this.collectionData = null
      }
      
      this.modalVisibility = true
      document.body.style.overflow = 'hidden'
    },
    afterCloseModal() {
      this.modalVisibility = false
      document.body.removeAttribute('style')
      this.$router.push('/movies')
    }
  },
};
</script>

<style lang="scss" scoped>

.modal-backdrop {
  opacity: .5;
}
</style>