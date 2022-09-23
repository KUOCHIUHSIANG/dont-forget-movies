import { apiHelper, apiKEY } from "../utils/helpers";

export default {
  getTrending() {
    return apiHelper.get(
      `/trending/movie/week?api_key=${apiKEY}&language=zh-TW`
    );
  },
  getOnShow({ lte }) {
    return apiHelper.get(
      `/discover/movie?api_key=${apiKEY}&language=zh-TW&region=TW&release_date.lte=${lte}&sort_by=release_date.desc&with_release_type=2|3`
    );
  },
  getComing({ gte }) {
    return apiHelper.get(
      `/discover/movie?api_key=${apiKEY}&language=zh-TW&region=TW&release_date.gte=${gte}&sort_by=release_date.asc&with_release_type=2|3`
    );
  },
  getPopularity() {
    return apiHelper.get(
      `/discover/movie?api_key=${apiKEY}&language=zh-TW&region=TW&with_release_type=2|3&sort_by=popularity.desc`
    );
  },
  getMovieDetail({ movieId }) {
    return apiHelper.get(
      `/movie/${ movieId }?api_key=${ apiKEY }&language=zh-TW&region=TW&append_to_response=credits`
    );
  },
  getCollection({ collectionId }) {
    return apiHelper.get(
      `/collection/${ collectionId }?api_key=${ apiKEY }&language=zh-TW&region=TW`
    );
  },
  searchMovie({ keyword }) {
    return apiHelper.get(
      `/search/movie?api_key=${ apiKEY }&language=zh-TW&query=${ keyword }`
    );
  }
};