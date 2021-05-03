<template>
  <v-container>
    <v-text-field
      v-model="searchString"
      label="Название или автор (минимум три символа)"
      clearable
      prepend-inner-icon="mdi-magnify"
    ></v-text-field>
    <v-container fluid>
      <v-row dense>
        <book-card
          v-for="book in books"
          :key="book.id"
          :book="book"
        ></book-card>
      </v-row>
    </v-container>
    <div v-intersect="next"></div>
  </v-container>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Inject, Vue, Watch } from 'vue-property-decorator'

import BookCard from '@/components/common/bookCard.vue'
import BookService from '@/services/bookService'
import { BookDto } from '@/model/bookDto'
import { BookFilter } from '@/services/filters/bookFilter'
import { SortValue, asc } from '@/model/sortValue'

@Component({
  components: {
    BookCard
  }
})
export default class MyBooks extends Vue {
  @Inject() readonly bookService!: BookService;

  public requestCount = 20
  public allElements = false
  public searchString = ''
  public books: BookDto[] = []
  public bookFilter = new BookFilter(
    undefined,
    false,
    new SortValue<string>(undefined, asc),
    undefined,
    this.requestCount
  )

  public async mounted () {
    this.books = await this.bookService.retrieve(this.bookFilter)
    if (this.books.length < this.requestCount) {
      this.allElements = true
    }
  }

  @Watch('searchString')
  public async searchChange (common: string, oldCommon: string) {
    if (common && common !== '' && common.length >= 3) {
      this.bookFilter.titleAuthorFilter = common
      this.books = await this.bookService.retrieve(this.bookFilter)
      this.allElements = this.books.length < this.requestCount
    } else if (oldCommon && oldCommon !== '' && oldCommon.length >= 3) {
      this.bookFilter.titleAuthorFilter = undefined
      this.books = await this.bookService.retrieve(this.bookFilter)
      this.allElements = this.books.length < this.requestCount
    }
  }

  public async next () {
    if (!this.allElements && this.books.length > 0) {
      const lastBook = this.books[this.books.length - 1]
      if (this.bookFilter.titleSort) {
        this.bookFilter.titleSort.maxValue = lastBook.title
      }
      const nextBooks = await this.bookService.retrieve(this.bookFilter)
      nextBooks.forEach(book => this.books.push(book))
      if (nextBooks.length < this.requestCount) {
        this.allElements = true
      }
    }
  }
}
</script>
