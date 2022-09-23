import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import DontForgetMovies from '../views/Movies.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "root",
    redirect: "/dont-forget-movies",
  },
  {
    path: "/dont-forget-movies",
    name: "dont-forget-movies",
    component: DontForgetMovies,
    children: [
      {
        path: "movie/:id",
        name: "movie-detail",
        component: () => import("../components/MovieDetail.vue"),
      },
    ],
  },
  {
    path: "/dont-forget-movies/to-watch",
    name: "to-watch",
    component: () => import("../views/ToWatch.vue"),
  },
  {
    path: "/dont-forget-movies/search",
    name: "search",
    component: () => import("../views/Search.vue"),
  },
  {
    path: "*",
    name: "not-found",
    component: NotFound,
  },
];

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})

export default router
