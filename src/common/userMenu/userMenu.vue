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
      <user-avatar/>
      <admin-menu-items/>
      <user-menu-items/>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Vue } from 'vue-property-decorator'

import { UserDto } from '@/model/userDto'
import UserMenuItems from '@/common/userMenu/userMenuItems.vue'
import UserAvatar from '@/common/userMenu/userAvatar.vue'
import AdminMenuItems from '@/common/userMenu/adminMenuItems.vue'

@Component({
  components: {
    UserMenuItems,
    UserAvatar,
    AdminMenuItems
  }
})
export default class UserMenu extends Vue {
  get account (): UserDto {
    return this.$store.getters.account
  }
}
</script>

<style scoped>

</style>
