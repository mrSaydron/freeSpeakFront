import axios from 'axios'
import { Store } from 'vuex'
import VueRouter from 'vue-router'
import { UserDto } from '@/model/userDto'

export default class AccountService {
  // eslint-disable-next-line
  constructor (private store: Store<any>, private router: VueRouter) {
  }

  public async login (login: string, password: string, remember: boolean): Promise<boolean> {
    const data = { username: login, password: password, rememberMe: remember }
    try {
      const result = await axios.post('api/authenticate', data)
      await this.pushToken(result)
      return true
    } catch (err) {
      return false
    }
  }

  public async pushToken (response: any): Promise<void> {
    const bearerToken = response.headers.authorization
    if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
      const jwt = bearerToken.slice(7, bearerToken.length)
      localStorage.setItem('jhi-authenticationToken', jwt)
    }
    await this.retrieveAccount()
  }

  public retrieveAccount (): Promise<boolean> {
    return new Promise(resolve => {
      axios
        .get('/api/account')
        .then(response => {
          console.log(response)

          this.store.commit('authenticate')
          const account = response.data
          if (account) {
            this.store.commit('authenticated', account)
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

  public async register (user: UserDto): Promise<boolean> {
    try {
      const result = await axios.post('/api/register', user)
      await this.pushToken(result)
    } catch (err) {
      throw err.response.data
    }
    return true
  }
}
