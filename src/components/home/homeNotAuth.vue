<template>
  <v-container
    fluid
  >
    <div>
      <p>Страница не авторизованного пользователя</p>
      <p>Здесь должна распологаться информация о сервисе и возможность зарегистрироваться</p>
    </div>
    <div>
      <h2 class="text-center">Название сервиса</h2>
    </div>
    <div class="text-center mt-3">
      <v-btn
        to="/login-form"
        elevation="2"
      >Войти</v-btn>
    </div>
    <div class="text-center mt-3">
      <v-btn
        to="/register"
        elevation="2"
      >Зарегистрироваться</v-btn>
    </div>
  </v-container>
</template>

<script>
import Component from 'vue-class-component'
import { Vue } from 'vue-property-decorator'

@Component
export default class HomeNotAuth extends Vue {
}
</script>
