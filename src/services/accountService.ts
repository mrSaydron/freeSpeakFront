import axios from 'axios'
import { Store } from 'vuex'
import VueRouter from 'vue-router'

export default class AccountService {
  // eslint-disable-next-line
  constructor (private store: Store<any>, private router: VueRouter) {
  }

  public async login (login: string, password: string, remember: boolean): Promise<boolean> {
    const data = { username: login, password: password, rememberMe: remember }

    try {
      const result = await axios.post('api/authenticate', data)

      const bearerToken = result.headers.authorization
      if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
        const jwt = bearerToken.slice(7, bearerToken.length)
        if (remember) {
          localStorage.setItem('jhi-authenticationToken', jwt)
        } else {
          sessionStorage.setItem('jhi-authenticationToken', jwt)
        }
      }

      this.retrieveAccount()
      return true
    } catch (err) {
      return false
    }
  }

  public retrieveAccount (): Promise<boolean> {
    return new Promise(resolve => {
      axios
        .get('api/account')
        .then(response => {
          console.log(response)

          this.store.commit('authenticate')
          const account = response.data
          if (account) {
            this.store.commit('authenticated', account)
            // if (this.store.getters.currentLanguage !== account.langKey) {
            //   this.store.commit('currentLanguage', account.langKey)
            // }
            if (sessionStorage.getItem('requested-url')) {
              const requestUrl: string = sessionStorage.getItem('requested-url') || ''
              this.router.replace(requestUrl)
              sessionStorage.removeItem('requested-url')
            }
          } else {
            this.store.commit('logout')
            this.router.push('/')
            sessionStorage.removeItem('requested-url')
          }
          resolve(true)
        })
        .catch(() => {
          this.store.commit('logout')
          resolve(false)
        })
    })
  }

  public hasAnyAuthorityAndCheckAuth (authorities: any): Promise<boolean> {
    if (typeof authorities === 'string') {
      authorities = [authorities]
    }

    if (!this.authenticated || !this.userAuthorities) {
      const token = localStorage.getItem('jhi-authenticationToken') || sessionStorage.getItem('jhi-authenticationToken')
      if (!this.store.getters.account && !this.store.getters.logon && token) {
        return this.retrieveAccount()
      } else {
        return new Promise(resolve => {
          resolve(false)
        })
      }
    }

    for (let i = 0; i < authorities.length; i++) {
      if (this.userAuthorities.includes(authorities[i])) {
        return new Promise(resolve => {
          resolve(true)
        })
      }
    }

    return new Promise(resolve => {
      resolve(false)
    })
  }

  public get authenticated (): boolean {
    return this.store.getters.authenticated
  }

  public get userAuthorities (): any {
    return this.store.getters.account.authorities
  }
}
