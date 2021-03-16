<template>
  <v-container>
    <v-row>
      <v-btn to="/">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-row>
    <div class="text-center" v-if="loginError">
      <p class="red--text">Неправильный логин или пароль. Пожалуйста, повторите попытку</p>
    </div>
    <v-row>
      <v-col>
        <v-form
          ref="login-form"
        >
          <v-text-field
            v-model="login"
            label="Логин"
            required
          ></v-text-field>
          <v-text-field
            :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
            :type="passwordShow ? 'text' : 'password'"
            v-model="password"
            label="Пароль"
            required
            @click:append="passwordShow = !passwordShow"
          ></v-text-field>
          <v-checkbox
            v-model="remember"
            label="Помнить меня"
          ></v-checkbox>
          <v-btn class="mr-4" @click="signIn">Войти</v-btn>
          <v-btn class="mr-4">Зарегистрирвться</v-btn>
          <v-btn class="mr-4">Востановить</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Vue, Inject } from 'vue-property-decorator'

import AccountService from '@/services/accountService.js'

@Component({
  components: {}
})
export default class LoginForm extends Vue {
  @Inject() readonly accountService!: AccountService;

  public login = '';
  public password = '';
  public remember = false;
  public passwordShow = false;
  public loginError = false;

  public async signIn (): Promise<void> {
    const result = await this.accountService.login(this.login, this.password, this.remember)
    if (result) {
      this.$router.push('/')
    } else {
      this.loginError = true
    }
  }
}
</script>
