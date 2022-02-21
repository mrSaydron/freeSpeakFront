<template>
  <v-list>
    <v-list-item class="justify-center pt-3">
      <v-avatar color="red">
        <span class="white--text headline">{{ account.login }}</span>
      </v-avatar>
    </v-list-item>
    <v-list-item class="justify-center">
      <h3>{{ account.firstName }}</h3>
    </v-list-item>
    <v-list-item class="justify-center">
      <p class="mb-0">
        {{ account.email }}
      </p>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Vue } from 'vue-property-decorator'
import { UserDto } from '../../model/userDto'

@Component({
  components: {}
})
export default class UserAvatar extends Vue {
  get account (): UserDto {
    return this.$store.getters.account
  }
}
</script>

<style scoped>

</style>
