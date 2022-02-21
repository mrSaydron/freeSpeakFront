<template>
  <div v-if="isAdmin">
    <v-divider></v-divider>
    <v-list
      nav
      dense
    >
      <v-list-item class="justify-center">
        <v-btn
          depressed
          text
          @click="toAddBook"
        >
          ЗАГРУЗИТЬ КНИГУ
        </v-btn>
      </v-list-item>
      <v-list-item class="justify-center">
        <v-btn
          depressed
          text
          @click="toTextTags"
        >
          ТЕГИ ДЛЯ ТЕКСТА
        </v-btn>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Inject, Vue } from 'vue-property-decorator'
import AccountService from '../../services/accountService'

@Component({
  components: {}
})
export default class AdminMenuItems extends Vue {
  @Inject() readonly accountService!: AccountService;

  private isAdminUser = false

  public toAddBook () {
    this.$router.push('/new-book')
  }

  public toTextTags () {
    this.$router.push({ name: 'textTags' })
  }

  public get isAdmin (): boolean {
    this.accountService
      .hasAnyAuthorityAndCheckAuth('ROLE_ADMIN')
      .then(value => {
        this.isAdminUser = value
      })
    return this.isAdminUser
  }
}
</script>

<style scoped>

</style>
