import Vue from 'vue'
import Router from 'vue-router'
import Recommend from './views/Recommend.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    //路由重定向
    {
      path: '/',
      redirect:'/recommend'
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend,
      children: [{
        path: '/recommend/:id',
        component: ()=> import('./views/RecomDetail.vue')
      }]
    },
    {
      path: '/rank',
      name: 'rank',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Rank.vue'),
      children: [{
        path: '/rank/:id',
        component: ()=> import('./views/RankDetail.vue')
      }]
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/Search.vue')
    },
    {
      path: '/singer',
      name: 'singer',
      component: () => import('./views/Singer.vue'),
      children: [{
        path: '/singer/:id',
        component: ()=> import('./views/SingerDetail.vue')
      }]

    }
  ]
})
