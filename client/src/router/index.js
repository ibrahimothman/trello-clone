import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';
import Boards from '../views/Boards.vue';
import Board from '../views/Board.vue';
import Store from '../store/index';

Vue.use(VueRouter);

function isLoggedIn(to, from, next) {
  Store.dispatch('auth/authenticate')
    .then(() => next())
    .catch(() => next('/login'));
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter(to, from, next) {
      Store.dispatch('auth/authenticate')
        .then(() => next('/boards'))
        .catch(() => next('/login'));
    },
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/boards',
    name: 'boards',
    component: Boards,
    beforeEnter: isLoggedIn,
  },
  {
    path: '/boards/:id',
    name: 'board',
    component: Board,
    beforeEnter: isLoggedIn,

  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
