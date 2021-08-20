<template>
  <v-menu
    bottom
    min-width="200px"
    rounded
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-btn
        icon
        x-large
        v-on="on"
      >
        <v-avatar
          color="white"
          size="36"
        >
          <span class="black--text title">{{ account.login }}</span>
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-list-item-content class="justify-center">
        <div class="mx-auto text-center">
          <v-avatar
            color="red"
          >
            <span class="white--text headline">{{ account.login }}</span>
          </v-avatar>
          <h3>{{ account.firstName }}</h3>
          <p class="caption mt-1">
            {{ account.email }}
          </p>
          <v-divider class="my-3"></v-divider>
          <v-btn
            depressed
            rounded
            text
            @click="logout"
          >
            ВЫЙТИ
          </v-btn>
        </div>
      </v-list-item-content>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Vue } from 'vue-property-decorator'

import { UserDto } from '@/model/userDto'

@Component({
  components: {}
})
export default class UserMenu extends Vue {
  get account (): UserDto {
    return this.$store.getters.account
  }

  public logout () {
    this.$store.commit('logout')
    this.$router.push('/')
  }
}
</script>

<style scoped>

</style>
