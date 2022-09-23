<template>
  <div>Search Page__ Keyword: {{ keyword }}
  </div>
</template>

<script>
import moviesAPI from "../apis/movies";

export default {
  created() {
    this.keyword = this.$route.query.keyword;
    this.searchMovie(this.keyword)
  },
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    async searchMovie(keyword) {
      const { data } = await moviesAPI.searchMovie({ keyword })
      console.log(data);
    },
  },
};
</script>