import Vue from 'vue';
import VueRouter from 'vue-router';
import Buefy from 'buefy';
import TodoList from '../components/TodoList.vue';

Vue.use(VueRouter);
Vue.use(Buefy, {
  defaultIconPack: 'fas',
});

import 'buefy/dist/buefy.css';

const routes = [
  {
    path: '/',
    name: 'TodoList',
    component: TodoList,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
