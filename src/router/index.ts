import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import { Authority } from '@/shared/authority'

import Home from '../views/home/home.vue'
import LoginForm from '@/views/account/loginForm.vue'
import Library from '@/views/library/library.vue'
import NewBook from '@/views/newBook/newBook.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login-form',
    name: 'LoginForm',
    component: LoginForm
  },
  {
    path: '/library',
    name: 'Library',
    component: Library,
    meta: {
      authorities: [Authority.USER],
      backPage: '/'
    }
  },
  {
    path: '/new-book',
    name: 'NewBook',
    component: NewBook,
    meta: {
      authorities: [Authority.USER],
      backPage: '/library'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
