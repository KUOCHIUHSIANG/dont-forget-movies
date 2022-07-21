<template>
  <div class="modal" tabindex="-1" id="movie-detail">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="movie-detail-header" :style="{ backgroundImage: 'linear-gradient(transparent, #181818) , url('+ backdrop +')'}">
          <div class="movie-detail-header-title-wrapper">
            <div class="movie-title">惡靈古堡</div>
            <div class="movie-original-title">Resident evil</div>
          </div>
          <div class="movie-detail-header-add-button button-size">＋</div>
          <div class="movie-detail-header-delete-button button-size">✔</div>
          <div class="movie-detail-header-close-button" data-dismiss="modal" aria-label="Close">✕</div>
        </div>
        <div class="modal-body">
          <p>布魯斯韋恩雖然是高譚市首富家族的繼承者，性格卻非常孤僻，同時在夜晚化身為蝙蝠俠打擊罪犯。當謎天大聖留下新的謎題，設下陷阱殺害高譚市的菁英份子後，蝙蝠俠循著神祕線索，並與貓女聯手為高譚市伸張正義。  兩年來，布魯斯韋恩化身為蝙蝠俠 (羅伯派汀森 飾) 在街頭剷惡鋤奸，逐漸在罪犯腦中植入恐懼的種子，並在其他市民心中建立了復仇使者的形象，與此同時卻也讓自己牽扯進高譚市的陰暗面中。他在高譚市貪汙腐敗的政府官員和名人之中，也只有少數可以信任的盟友，盟友包含阿福潘尼沃斯 (安迪瑟克斯 飾) 及詹姆斯高登 (傑佛瑞萊特 飾)。  當一名兇手透過一連串殘忍的陰謀詭計，虐殺高譚市許多菁英份子後，蝙蝠俠這位世上最偉大的偵探依循著神祕線索，展開對地下社會的調查行動，並遇見塞琳娜凱爾/別名貓女 (柔伊克拉維茲 飾)、奧斯華科波特/別名企鵝人 (柯林法洛 飾)、卡麥法爾康尼 (約翰特托羅 飾)，以及愛德華納許頓/別名謎天大聖 (保羅迪諾 飾) 等人。當證據顯示兇手越來越接近，其計畫也越來越明朗，蝙蝠俠必須建立好新的關係，揭露兇手的真面目，並為長久以來發生貪腐弊端的高譚市伸張正義。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backdrop: 'https://image.tmdb.org/t/p/original/IYUD7rAIXzBM91TT3Z5fILUS7n.jpg'
    }
  }
}
</script>>

<style lang="scss" scoped>
@import '../assets/scss/variable.scss';

  .modal-content {
    background-color: #181818;
    .movie-detail-header {
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
      &-title-wrapper {
        font-size: 2.25rem;
        line-height: 1.5;
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
          background-color: #3C3C3C;
        }
      }
      .button-size {
        width: 31px;
        height: 31px;
        line-height: 31px;
        text-align: center;
        border-radius: 50%;
        border: 1px solid #3C3C3C;
        background-color: #3C3C3C2C;
        margin-left: 10px;
        cursor: pointer;
        &:hover {
          border: 1px solid #FFF;
        }
      }
    }
  }
</style>