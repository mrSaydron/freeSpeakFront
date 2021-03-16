<template>
  <v-container>
    <div>
      <p>Страница авторизованного пользователя</p>
      <p>Задание на день для пользователя</p>
      <p>Статистика пользователя</p>
    </div>
  </v-container>
</template>

<script>
import Component from 'vue-class-component'
import { Vue } from 'vue-property-decorator'

@Component
export default class HomeAuth extends Vue {
}
</script>
