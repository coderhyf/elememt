import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use (VueRouter)
const routes = [
  {
    path: '/',
    // name: 'index',
    component: () => import('../views/Index'),
    children:[
      {
        path:'',
        redirect:'/home'
      },
      {
        path:'/home',
        name:'home',
        component: ()=> import('../views/home/Home')
      },
      {
        path:'/order',
        name:'order',
        component: ()=> import('../views/order/Order')
      },
      {
        path:'/me',
        name:'me',
        component: ()=> import('../views/me/Me')
      },
      {
        path: '/address',
        name: 'addRess',
        component: () => import('../views/address/addRess')
      }
    ]
  },
  {
    path: '/longin',
    name: 'Longin',
    component: () => import('../views/Longin')
  },
  // {
  //   path: '*',
  //   redirect: '/longin'
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
