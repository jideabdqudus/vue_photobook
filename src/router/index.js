import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignUpPage from '../views/SignUpPage.vue'
import AlbumsPage from '../views/AlbumsPage.vue'
import AlbumDetailPage from '../views/AlbumDetailPage.vue'
import {Auth} from "aws-amplify"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'SignUpPage',
    component: SignUpPage
  },
  {
    path: '/albums',
    name: 'AlbumsPage',
    component: AlbumsPage,
    meta:{ requiresAuth: true}
  },
  {
    path: '/album/:id',
    name: 'AlbumDetailPage',
    component: AlbumDetailPage,
    meta:{ requiresAuth: true}
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async(to, from, next)=>{
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = await Auth.currentUserInfo()
  if (requiresAuth && !isAuthenticated){
    next("/")
  }else{
    next()
  }
})

export default router
