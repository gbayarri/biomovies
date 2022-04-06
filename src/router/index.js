import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import List from '../views/List.vue'
import About from '../views/About.vue'
import VideoMenu from '../views/VideoMenu.vue'
import Representation from '../views/Representation.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/list',
    name: 'List',
    component: List
  },
  {
    path: '/representation',
    name: 'Representation',
    component: Representation,
    props: true
  },
  {
    path: '/video/:type',
    name: 'VideoMenu',
    component: VideoMenu,
    props: true
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
