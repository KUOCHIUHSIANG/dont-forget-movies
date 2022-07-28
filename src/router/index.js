import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import MovieDetail from '../components/MovieDetail'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "root",
    redirect: "/movies",
  },
  {
    path: "/movies",
    name: "movies",
    component: () => import("../views/Movies.vue"),
    children: [
      {
        path: "/movies/:id",
        name: "movie-detail",
        component: MovieDetail,
      },
    ],
  },
  {
    path: "/to-watch",
    name: "to-watch",
    component: () => import("../views/ToWatch.vue"),
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
