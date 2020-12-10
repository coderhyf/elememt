import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use (VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/Index')
  },
  {
    path: '/longin',
    name: 'Longin',
    component: () => import('../views/Longin')
  },
  // {
  //   path: '*',
  //   redirect: {name: 'index'}
  // }
]

const router = new VueRouter ({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach ((to, from, next) => {
  const isLongin = !!localStorage.ele_login;
  if (to.path === '/longin') {
    next ();
  } else {
    isLongin ? next () : next ('/longin');
  }
})
export default router
