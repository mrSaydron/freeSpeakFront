import Vue from 'vue'
import VueRouter, { Route, RouteConfig } from 'vue-router'

import { Authority } from '@/shared/authority'

import LoginForm from '@/components/account/loginForm.vue'
import Library from '@/components/library/library.vue'
import NewBook from '@/components/newBook/newBook.vue'
import Book from '@/components/book/book.vue'
import MyDictionary from '@/components/myDictionary/myDictionary.vue'
import CardsLearn from '@/components/cardsLearn/cardsLearn.vue'

Vue.use(VueRouter)

let lastPage: Route | null = null

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Library,
    meta: {
      authorities: [Authority.USER]
    }
  },
  {
    path: '/login-form',
    component: LoginForm
  },
  {
    path: '/new-book',
    component: NewBook,
    meta: {
      authorities: [Authority.ADMIN],
      backPage: () => {
        return '/'
      }
    }
  },
  {
    path: '/book/:id',
    props: true,
    component: Book,
    meta: {
      authorities: [Authority.USER],
      backPage: () => {
        return '/'
      }
    }
  },
  {
    path: '/my-dictionary',
    component: MyDictionary,
    meta: {
      authorities: [Authority.USER],
      backPage: () => {
        return '/'
      }
    }
  },
  {
    path: '/cards-learn',
    component: CardsLearn,
    meta: {
      authorities: [Authority.USER],
      backPage: () => {
        return '/'
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  lastPage = from
  next()
})

export default router
