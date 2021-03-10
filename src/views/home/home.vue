<template>
  <v-container>
    <HomeAuth v-if="authenticated"></HomeAuth>
    <HomeNotAuth v-else></HomeNotAuth>
  </v-container>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Vue } from 'vue-property-decorator'

import HomeAuth from '@/views/home/homeAuth.vue'
import HomeNotAuth from '@/views/home/homeNotAuth.vue'

@Component({
  components: {
    HomeAuth,
    HomeNotAuth
  }
})
export default class Home extends Vue {
  public get authenticated (): boolean {
    return this.$store.getters.authenticated
  }
}
</script>
