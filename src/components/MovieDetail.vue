<template>
  <div class="modal" tabindex="-1" id="movie-detail">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div
          class="movie-detail-header"
          :style="{
            backgroundImage:
              'linear-gradient(transparent, #181818) , url(' + backdrop + ')',
          }"
        >
          <div class="movie-detail-header-title-wrapper">
            <div class="movie-title">惡靈古堡</div>
            <div class="movie-original-title">Resident evil</div>
          </div>
          <div class="movie-detail-header-add-button button-size">＋</div>
          <div class="movie-detail-header-delete-button button-size">✔</div>
          <div
            class="movie-detail-header-close-button"
            data-dismiss="modal"
            aria-label="Close"
          >
            ✕
          </div>
        </div>
        <div class="modal-body">
          <div class="movie-detail-body">
            <div class="movie-info">
              <div class="movie-info-wrapper">
                <div class="release-date">
                  <span class="info-title">上映日期：</span>2022-06-17
                </div>
                <div class="runtime">
                  <span class="info-title">片長：</span>1 時 47 分
                </div>
              </div>
              <div class="movie-genres">
                <span class="info-title">類型：</span>犯罪、懸疑、驚悚
              </div>
            </div>
            <div class="movie-vote">
              平均獲得<span class="movie-vote-average"> 6.2 </span>分（<span
                class="movie-vote-count"
                >8820</span
              >個評分）
            </div>
            <div class="movie-overview">
              <span class="info-title">電影簡介：</span>
              <p class="movie-overview">
                布魯斯韋恩雖然是高譚市首富家族的繼承者，性格卻非常孤僻，同時在夜晚化身為蝙蝠俠打擊罪犯。當謎天大聖留下新的謎題，設下陷阱殺害高譚市的菁英份子後，蝙蝠俠循著神祕線索，並與貓女聯手為高譚市伸張正義。
                兩年來，布魯斯韋恩化身為蝙蝠俠 (羅伯派汀森 飾)
                在街頭剷惡鋤奸，逐漸在罪犯腦中植入恐懼的種子，並在其他市民心中建立了復仇使者的形象，與此同時卻也讓自己牽扯進高譚市的陰暗面中。他在高譚市貪汙腐敗的政府官員和名人之中，也只有少數可以信任的盟友，盟友包含阿福潘尼沃斯
                (安迪瑟克斯 飾) 及詹姆斯高登 (傑佛瑞萊特 飾)。
                當一名兇手透過一連串殘忍的陰謀詭計，虐殺高譚市許多菁英份子後，蝙蝠俠這位世上最偉大的偵探依循著神祕線索，展開對地下社會的調查行動，並遇見塞琳娜凱爾/別名貓女
                (柔伊克拉維茲 飾)、奧斯華科波特/別名企鵝人 (柯林法洛
                飾)、卡麥法爾康尼 (約翰特托羅 飾)，以及愛德華納許頓/別名謎天大聖
                (保羅迪諾 飾)
                等人。當證據顯示兇手越來越接近，其計畫也越來越明朗，蝙蝠俠必須建立好新的關係，揭露兇手的真面目，並為長久以來發生貪腐弊端的高譚市伸張正義。
              </p>
            </div>
            <div class="movie-cast">
              <span class="info-title">演員：</span>Chris Hemsworth、Natalie
              Portman、Christian Bale、Tessa Thompson、Taika Waititi
              <span class="movie-cast-more">查看更多...</span>
              <span class="movie-cast-less">查看更少...</span>
            </div>
            <div class="movie-collection-list">
              <div class="movie-collection-list__title"><span class="info-title">相關系列：</span></div>
              <ul class="movie-collection-list__list">
                <li class="list-item">
                  <div class="hover-wrapper">
                      <div class="movie-poster">
                        <img
                          src="https://image.tmdb.org/t/p/original/tuzKA9K5Ae9IzaA0R9oAgbyhAI3.jpg"
                          alt="poster"
                          class="poster"
                        />
                      </div>
                      <div class="movie-info">
                        <div class="movie-info__movie-title">
                          蝙蝠俠
                        </div>
                        <div class="movie-info__movie-original-title">
                          bat man
                        </div>
                        <div class="movie-info__movie-release-date">
                          上映日期：<span>2023-06-30</span>
                        </div>
                      </div>
                  </div>
                </li>
                <li class="list-item">
                  <div class="hover-wrapper">
                      <div class="movie-poster">
                        <img
                          src="https://image.tmdb.org/t/p/original/tuzKA9K5Ae9IzaA0R9oAgbyhAI3.jpg"
                          alt="poster"
                          class="poster"
                        />
                      </div>
                      <div class="movie-info">
                        <div class="movie-info__movie-title">
                          蝙蝠俠
                        </div>
                        <div class="movie-info__movie-original-title">
                          bat man
                        </div>
                        <div class="movie-info__movie-release-date">
                          上映日期：<span>2023-06-30</span>
                        </div>
                      </div>
                  </div>
                </li>
                <li class="list-item">
                  <div class="hover-wrapper">
                      <div class="movie-poster">
                        <img
                          src="https://image.tmdb.org/t/p/original/tuzKA9K5Ae9IzaA0R9oAgbyhAI3.jpg"
                          alt="poster"
                          class="poster"
                        />
                      </div>
                      <div class="movie-info">
                        <div class="movie-info__movie-title">
                          蝙蝠俠
                        </div>
                        <div class="movie-info__movie-original-title">
                          bat man
                        </div>
                        <div class="movie-info__movie-release-date">
                          上映日期：<span>2023-06-30</span>
                        </div>
                      </div>
                  </div>
                </li>
                <li class="list-item">
                  <div class="hover-wrapper">
                      <div class="movie-poster">
                        <img
                          src="https://image.tmdb.org/t/p/original/tuzKA9K5Ae9IzaA0R9oAgbyhAI3.jpg"
                          alt="poster"
                          class="poster"
                        />
                      </div>
                      <div class="movie-info">
                        <div class="movie-info__movie-title">
                          蝙蝠俠
                        </div>
                        <div class="movie-info__movie-original-title">
                          bat man
                        </div>
                        <div class="movie-info__movie-release-date">
                          上映日期：<span>2023-06-30</span>
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
</template>

<script>
export default {
  data() {
    return {
      backdrop:
        "https://image.tmdb.org/t/p/original/IYUD7rAIXzBM91TT3Z5fILUS7n.jpg",
    };
  },
};
</script>
>

<style lang="scss" scoped>
@import "../assets/scss/variable.scss";

.modal-content {
  background-color: #181818;
  .movie-detail-header {
    flex: 1 1 70%;
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
    background-position: center;
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
        background-color: #3c3c3c;
      }
    }
    .button-size {
      width: 31px;
      height: 31px;
      line-height: 31px;
      text-align: center;
      border-radius: 50%;
      border: 1px solid #3c3c3c;
      background-color: #3c3c3c2c;
      margin-left: 10px;
      cursor: pointer;
      &:hover {
        border: 1px solid #fff;
      }
    }
  }

  .modal-body {
    flex: 1 2 auto;
    span.info-title {
      color: #777777;
    }

    .movie-info {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      line-height: 1.8;
    }

    .movie-vote {
      font-size: 12px;
      color: $vote-color;
      &-average {
        font-size: 16px;
      }
    }

    .movie-vote, p.movie-overview, .movie-cast,.movie-collection-list__title {
      margin: 20px 0;
      line-height: 1.5;
    }

    .movie-info, p.movie-overview, .movie-cast{
      font-weight: 300;
    }

    ul.movie-collection-list__list {
      display: flex;
      flex-wrap: wrap;
      li.list-item {
        margin: 0 0.8em 0.8em 0;
        cursor: pointer;
        .movie-poster {
          width: 150px;
          height: 225px;
        }
        .movie-info {
          flex-direction: column;
          align-items: center;
          line-height: 1.2;
          &__movie-original-title {
            color: $original-movie-title;
          }
        }
      }
    }
  }
}

/* media query */
// Small devices , > 576px 
@media screen and (min-width: 576px) {
  .modal-dialog {
    max-width: 95%;
  }
}

// Medium devices , > 768px
@media screen and (min-width: 768px) {
  .modal-dialog {
    max-width: 70%;
  }
}

</style>
