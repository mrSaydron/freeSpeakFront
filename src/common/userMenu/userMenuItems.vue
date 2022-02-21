<template>
  <div>
    <v-divider></v-divider>
    <v-list
      class="justify-center"
    >
      <v-list-item class="justify-center">
        <v-btn
          depressed
          text
          @click="logout"
        >
          ВЫЙТИ
        </v-btn>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class UserMenuItems extends Vue {
  public logout () {
    this.$store.commit('logout')
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this.$router.push('/').catch(() => {})
  }
}
</script>

<style scoped>

</style>
