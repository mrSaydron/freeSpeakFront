import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import { Authority } from '@/shared/authority'

import Home from '../components/home/home.vue'
import LoginForm from '@/components/account/loginForm.vue'
import Library from '@/components/library/library.vue'
import NewBook from '@/components/newBook/newBook.vue'
import Book from '@/components/book/book.vue'
import MyBooks from '@/components/myBooks/myBooks.vue'

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
    path: '/my-books',
    name: 'MyBooks',
    component: MyBooks,
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
  },
  {
    path: '/book/:id',
    props: true,
    name: 'Book',
    component: Book,
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
