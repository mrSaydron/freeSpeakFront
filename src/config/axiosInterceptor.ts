import axios from 'axios'
import moment from 'moment'

const TIMEOUT = 1000000
const onRequestSuccess = (config: any) => {
  const token = localStorage.getItem('jhi-authenticationToken') || sessionStorage.getItem('jhi-authenticationToken')
  if (token) {
    if (!config.headers) {
      config.headers = {}
    }
    config.headers.Authorization = `Bearer ${token}`
  }
  config.headers.Localtime = moment().format()
  config.timeout = TIMEOUT
  return config
}

const setupAxiosInterceptors = (onUnauthenticated: any) => {
  const onResponseError = (err: any) => {
    const status = err.status || err.response.status
    if (status === 403 || status === 401) {
      onUnauthenticated()
    }
    return Promise.reject(err)
  }
  if (axios.interceptors) {
    axios.interceptors.request.use(onRequestSuccess)
    axios.interceptors.response.use(res => res, onResponseError)
  }
}

export { onRequestSuccess, setupAxiosInterceptors }
