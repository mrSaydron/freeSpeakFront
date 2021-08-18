import Vue from 'vue'
import VueRouter, { Route, RouteConfig } from 'vue-router'

import { Authority } from '@/shared/authority'

import Home from '../components/home/home.vue'
import LoginForm from '@/components/account/loginForm.vue'
import Library from '@/components/library/library.vue'
import NewBook from '@/components/newBook/newBook.vue'
import Book from '@/components/book/book.vue'
import MyBooks from '@/components/myBooks/myBooks.vue'
import Dictionary from '@/components/dictionary/dictionary.vue'
import MyDictionary from '@/components/myDictionary/myDictionary.vue'
import CardsLearn from '@/components/cardsLearn/cardsLearn.vue'

Vue.use(VueRouter)

let lastPage: Route | null = null

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
      backPage: () => {
        return '/'
      }
    }
  },
  {
    path: '/my-books',
    name: 'MyBooks',
    component: MyBooks,
    meta: {
      authorities: [Authority.USER],
      backPage: () => {
        return '/'
      }
    }
  },
  {
    path: '/new-book',
    name: 'NewBook',
    component: NewBook,
    meta: {
      authorities: [Authority.USER],
      backPage: () => {
        return '/library'
      }
    }
  },
  {
    path: '/book/:id',
    props: true,
    name: 'Book',
    component: Book,
    meta: {
      authorities: [Authority.USER],
      backPage: () => {
        let result = '/library'
        if (lastPage && lastPage.path && lastPage.path === '/my-books') {
          result = '/my-books'
        }
        return result
      }
    }
  },
  {
    path: '/dictionary',
    name: 'Dictionary',
    component: Dictionary,
    meta: {
      authorities: [Authority.USER],
      backPage: () => {
        return '/'
      }
    }
  },
  {
    path: '/my-dictionary',
    name: 'MyDictionary',
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
    name: 'CardsLearn',
    component: CardsLearn,
    meta: {
      authorities: [Authority.USER],
      backPage: () => {
        return '/my-dictionary'
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
