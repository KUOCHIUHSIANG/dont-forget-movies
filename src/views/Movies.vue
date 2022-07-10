<template>
  <div class="container py-5">
    <MovieList :initialMovies="movies" :initialTitle="trendingTitle"/>
    <MovieList :initialMovies="movies" :initialTitle="trendingTitle"/>
    <ul>
      <li>本週熱門</li>
      <li>現正上映</li>
      <li>即將上映</li>
      <li>近期受歡迎</li>
    </ul>
  </div>
</template>

<script>
import moviesAPI from '../apis/movies'
import MovieList from '../components/MovieList.vue'

export default {
  components: {
    MovieList
  },
  created() {
    this.fetchTrending()
    this.nowTime()
  },
  data() {
    return {
      movies: [],
      trendingTitle: '本週熱門'
    }
  },
  methods: {
    async fetchTrending() {
      try {
        const { data }  = await moviesAPI.getTrending()
        this.movies = data.results.map((movie) => ({
          id: movie.id,
          posterPath: movie.poster_path,
          title: movie.title,
          originalTitle: movie.original_title,
          releaseDate: movie.release_date
        }))

      } catch (error) {
        console.log('error', error)
      }
    },
    nowTime() {
      const dateNow = Date()
      console.log(dateNow)
    }
  },
}
</script>
