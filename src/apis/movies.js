import { apiHelper, apiKEY } from "../utils/helpers";

export default {
  getTrending() {
    return apiHelper.get(
      `/trending/movie/week?api_key=${apiKEY}&language=zh-TW`
    );
  }
}