<template>
  <v-card>
    <v-card-title class="justify-center">
      На сегодня слов больше нет
    </v-card-title>
    <v-card-actions class="justify-center">
      <v-btn
        text
        @click="toHome"
      >
        Вернуться к урокам
        <v-icon class="ml-1">mdi-arrow-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Vue } from 'vue-property-decorator'

@Component({
  components: {
  }
})
export default class PlugCard extends Vue {
  public created () {
    document.addEventListener('keydown', this.pressKey)
  }

  public beforeDestroy () {
    document.removeEventListener('keydown', this.pressKey)
  }

  public pressKey (event: any) {
    if (event.code === 'ArrowRight') {
      this.toHome()
    }
  }

  public toHome () {
    this.$router.push({ name: 'home' })
  }
}
</script>

<style scoped>

</style>
