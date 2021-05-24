<template>
  <v-col sm="3">
    <v-card @click="toBook(book.id)">
      <v-img
        :src="book.pictureUrl"
        class="align-end shadow-text"
        height="200px"
      >
        <v-card-title>{{ book.title }}</v-card-title>
        <v-card-text>{{ book.author }}</v-card-text>
      </v-img>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Vue, Prop } from 'vue-property-decorator'
import { BookDto } from '@/model/bookDto'

@Component({
  components: {
  }
})
export default class BookCard extends Vue {
  @Prop(Object) readonly book: BookDto | undefined

  public toBook (id: number): void {
    this.$router.push(`/book/${id}`)
  }
}
</script>

<style scoped>
  .shadow-text {
    text-shadow: 0 0 10px white;
    color: black;
  }
</style>
