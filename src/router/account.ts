import LoginForm from '@/components/account/loginForm.vue'
import Register from '@/components/account/register.vue'
import ResetInit from '@/components/account/resetInit.vue'
import ResetFinish from '@/components/account/resetFinish.vue'

export default [
  {
    path: '/login-form',
    component: LoginForm,
    meta: {
      backPage: () => {
        return '/'
      }
    }
  },
  {
    path: '/register',
    component: Register,
    meta: {
      backPage: () => {
        return '/'
      }
    }
  },
  {
    path: '/reset-init',
    component: ResetInit,
    meta: {
      backPage: () => {
        return '/'
      }
    }
  },
  {
    path: '/reset-finish/:key',
    props: true,
    component: ResetFinish,
    meta: {
      backPage: () => {
        return '/'
      }
    }
  }
]
