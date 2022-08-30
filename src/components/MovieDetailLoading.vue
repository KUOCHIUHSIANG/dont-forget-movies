<template>
  <div class="modal" tabindex="-1" id="movie-detail">
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <LoadingSpinner />
        <div class="movie-detail-header-close-button">
          ✕
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from "./LoadingSpinner.vue";

export default {
  components: {
    LoadingSpinner,
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variable.scss";

.modal {
  display: block;
}

.modal-content {
  background-color: #181818;
  height: 85vh;
  .movie-detail-header-close-button {
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
}

</style>