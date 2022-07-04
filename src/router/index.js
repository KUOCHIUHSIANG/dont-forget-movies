import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: 'movies',
    component: () => import('../views/Movies.vue')
  },
  {
    path: "/to-watch",
    name: 'to-watch',
    component: () => import('../views/ToWatch.vue')
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
