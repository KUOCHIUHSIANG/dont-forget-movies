(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-79597976"],{"2d3b":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"container py-5 movie-list"},[i("div",{staticClass:"movie-list__title"},[t._v(" 您搜尋的關鍵字 "+t._s(t.keyword)+" ，搜尋結果為： ")]),t.isLoading?i("LoadingSpinner"):t._e(),0!==t.searchResult.length||t.isLoading?t.isLoading?t._e():i("ListTemplateVue",{attrs:{"initial-movies":t.searchResult,"initial-to-watch-movies":t.toWatchMovies},on:{"after-add-to-watch":t.afterAddToWatch,"after-delete-to-watch":t.afterDeleteToWatch}}):i("div",{staticClass:"empty-result"},[t._v(" 搜尋不到電影 ")])],1)},s=[],o=i("936f"),r=i("d76c"),h=i("cfd9");const c="to-watch-movies";var l={created(){this.keyword=this.$route.query.keyword,this.searchMovie(this.keyword),this.toWatchMovies=JSON.parse(localStorage.getItem(c))||[]},components:{ListTemplateVue:o["a"],LoadingSpinner:r["a"]},data(){return{keyword:"",toWatchMovies:[],searchResult:[],isLoading:!0}},methods:{async searchMovie(t){try{this.keyword=t;const{data:e}=await h["a"].searchMovie({keyword:t});this.searchResult=e.results.map(t=>({id:t.id,posterPath:t.poster_path,title:t.title,originalTitle:t.original_title,releaseDate:t.release_date,inToWatch:!1})),this.searchResult=this.filterToWatch(this.searchResult),this.isLoading=!1}catch(e){this.isLoading=!1,console.log("error",e)}},saveStorage(){localStorage.setItem(c,JSON.stringify(this.toWatchMovies))},afterAddToWatch(t){t.inToWatch=!0;const e={id:t.id,title:t.title,originalTitle:t.originalTitle,posterPath:t.posterPath,releaseDate:t.releaseDate,inToWatch:t.inToWatch};this.toWatchMovies.push(e),this.searchResult=this.filterToWatch(this.searchResult)},afterDeleteToWatch(t){t.inToWatch=!1,this.toWatchMovies=this.toWatchMovies.filter(e=>e.id!==t.id),this.searchResult=this.filterDeleteToWatch(t.id,this.searchResult)},filterToWatch(t){let e=t.map(t=>{if(this.toWatchMovies.length>0){for(let e=0;e<this.toWatchMovies.length;e++)t.id===this.toWatchMovies[e].id&&(t.inToWatch=!0);return t}return t});return e},filterDeleteToWatch(t,e){let i=e.map(e=>e.id===t?{...e,inToWatch:!1}:e);return i}},watch:{toWatchMovies:{handler:function(){this.saveStorage()},deep:!0}},beforeRouteUpdate(t,e,i){this.isLoading=!0;const a=t.query.keyword;this.searchMovie(a),i()}},n=l,d=(i("fbb4"),i("2877")),u=Object(d["a"])(n,a,s,!1,null,"4a294582",null);e["default"]=u.exports},dc52:function(t,e,i){},fbb4:function(t,e,i){"use strict";i("dc52")}}]);
//# sourceMappingURL=chunk-79597976.59d62856.js.map