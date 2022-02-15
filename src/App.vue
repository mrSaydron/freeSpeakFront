<template>
  <v-app>
    <Header></Header>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Vue } from 'vue-property-decorator'
import Header from '@/components/header/header.vue'

@Component({
  components: {
    Header
  }
})
export default class App extends Vue {
}
</script>
