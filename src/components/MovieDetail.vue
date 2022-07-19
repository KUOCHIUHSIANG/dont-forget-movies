<template>
  <div class="modal" tabindex="-1" id="movie-detail">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="movie-detail-header" :style="{ backgroundImage: 'linear-gradient(transparent, #181818) , url('+ backdrop +')'}">
          <div class="movie-detail-header-title">惡靈古堡</div>
          <div class="movie-detail-header-original-title">Resident evil</div>
          <div class="movie-detail-header-close-button" data-dismiss="modal" aria-label="Close">
            X ::before
          </div>
        </div>
        <div class="modal-body">
          <p>Modal body text goes here.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backdrop: 'https://image.tmdb.org/t/p/original/i2tcQ9nDJpdJELPA82eCd7Irasd.jpg'
    }
  }
}
</script>>

<style lang="scss" scoped>
  .modal-content {
    background-color: #181818;
    .movie-detail-header {
      position: relative;
      padding: 1rem 1rem;
      height: 300px;
      border-top-left-radius: calc(0.3rem - 1px);
      border-top-right-radius: calc(0.3rem - 1px);
      background-size: cover;
      background-repeat: no-repeat;
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
        &:hover {
          background-color: #3C3C3C;
        }
      }
    }
  }
</style>