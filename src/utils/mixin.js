export const mixinFilter = {
  filters: {
    fullyImagePath(src) {
      return `https://image.tmdb.org/t/p/w500${src}`;
    }
  },
};
