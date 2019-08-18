import Vue from 'vue';
import Router from 'vue-router';
import Admin from './views/admin/Admin.vue';
import Register from './views/admin/Register.vue';
import Err from './views/admin/Err.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'admin',
      component: Admin,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/err',
      name: 'err',
      component: Err,
    },
  ],
});
