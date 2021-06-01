import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import devEbs from '../views/devEbs.vue'
import qq from '../views/qq.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/ebs',
    name: 'ebs',
    component: devEbs
  },
  {
    path: '/qq',
    name: 'qq',
    component: qq
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
