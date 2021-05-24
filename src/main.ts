import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import { initVueApp } from '@/config/config'
import AccountService from '@/services/accountService'
import BookService from '@/services/bookService'
import BookDictionaryService from '@/services/bookDictionaryService'
import WordService from '@/services/wordService'
import UserWordService from '@/services/userWordService'
import FileService from '@/services/fileService'

Vue.config.productionTip = false

initVueApp(Vue)

const accountService = new AccountService(store, router)
const bookService = new BookService()
const dictionaryService = new BookDictionaryService()
const wordService = new WordService()
const userWordService = new UserWordService()
const fileService = new FileService()

router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    next('/not-found')
  }

  if (to.meta && to.meta.authorities && to.meta.authorities.length > 0) {
    accountService.hasAnyAuthorityAndCheckAuth(to.meta.authorities).then(value => {
      if (!value) {
        sessionStorage.setItem('requested-url', to.fullPath)
        next('/forbidden')
      } else {
        next()
      }
    })
  } else {
    // no authorities, so just proceed
    next()
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  provide: {
    accountService,
    bookService,
    dictionaryService,
    wordService,
    userWordService,
    fileService
  }
}).$mount('#app')
