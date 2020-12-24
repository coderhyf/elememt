import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use (VueRouter)
const routes = [
  {
    path: '/',
    // name: 'index',
    component: () => import('../views/Index'),
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/home/Home')
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('../views/order/Order')
      },
      {
        path: '/me',
        name: 'me',
        component: () => import('../views/me/Me')
      },
      {
        path: '/address',
        name: 'addRess',
        component: () => import('../views/address/addRess')
      },
      {
        path: '/city',
        name: 'City',
        component: () => import('../views/city/City')
      }
    ]
  },
  {
    path: '/longin',
    name: 'Longin',
    component: () => import('../views/Longin')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/search/Search')
  },
  {
    path: '/shop',
    name: 'Shop',
    redirect: '/goods',
    component: () => import('../views/shop/Shop'),
    children: [
      {
        path: '/seller',
        name: 'Seller',
        component: () => import('../components/shops/Seller')
      },
      {
        path: '/comments',
        name: 'Comments',
        component: () => import('../components/shops/Comments')
      },
      {
        path: '/goods',
        name: 'Goods',
        component: () => import('../components/shops/Goods')
      },
    ]
  },

]

const router = new VueRouter ({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
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
