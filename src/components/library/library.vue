<template>
  <v-container>
    <v-toolbar elevation="0">
      <sort-button
        text="Название"
        :direction="nameDirection"
        @update:direction="nameClick"
      >
      </sort-button>
      <sort-button
        text="Автор"
        :direction="authorDirection"
        @update:direction="authorClick"
      >
      </sort-button>
      <v-divider :vertical="true"></v-divider>
      <select-button
        text="100%"
        :select="know100"
        @update:select="know100Click"
      >
      </select-button>
      <select-button
        text="90%"
        :select="know90"
        @update:select="know90Click"
      >
      </select-button>
      <select-button
        text="50%"
        :select="know50"
        @update:select="know50Click"
      >
      </select-button>
      <select-button
        text="0%"
        :select="know0"
        @update:select="know0Click"
      >
      </select-button>
      <v-text-field
        v-model="searchString"
        label="Название или автор (минимум три символа)"
        clearable
        prepend-icon="mdi-magnify"
        single-line
        hide-details
      ></v-text-field>
    </v-toolbar>

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

import BookCard from '@/common/bookCard.vue'
import BookService from '@/services/bookService'
import { BookDto } from '@/model/bookDto'
import { BookFilter } from '@/services/filters/bookFilter'
import { SortValue, asc, desc, SortDirection } from '@/model/sortValue'
import SortButton from '@/common/sortButton.vue'
import SelectButton from '@/common/selectButton.vue'
import FileService from '@/services/fileService'
import { DefaultNamesEnum } from '@/model/enums/defaultNamesEnum'

@Component({
  components: {
    BookCard,
    SortButton,
    SelectButton
  }
})
export default class Library extends Vue {
  @Inject() readonly bookService!: BookService
  @Inject() readonly fileService!: FileService

  public requestCount = 20
  public allElements = false
  public searchString = ''
  public books: BookDto[] = []
  public bookFilter = new BookFilter(
    undefined,
    true,
    undefined,
    undefined,
    undefined,
    undefined,
    new SortValue<string>(undefined, asc),
    undefined,
    this.requestCount
  )

  public nameDirection: SortDirection | null = asc
  public authorDirection: SortDirection | null = null
  public know100 = false
  public know90 = false
  public know50 = false
  public know0 = false

  public async mounted () {
    await this.retrieve()
  }

  @Watch('searchString')
  public async searchChange (common: string, oldCommon: string) {
    if (common && common !== '' && common.length >= 3) {
      this.bookFilter.titleAuthorFilter = common
      await this.retrieve()
    } else if (oldCommon && oldCommon !== '' && oldCommon.length >= 3) {
      this.bookFilter.titleAuthorFilter = undefined
      await this.retrieve()
    }
  }

  public async retrieve (): Promise<void> {
    const nextBooks = await this.bookService.retrieve(this.bookFilter)
    nextBooks.forEach(book => {
      const name = book.pictureName ? book.pictureName : DefaultNamesEnum.book
      this.fileService.getUrl(name)
        .then(res => {
          book.pictureUrl = res
        })
    })
    this.books = this.books.concat(nextBooks)
    this.allElements = this.books.length < this.requestCount
  }

  public async next () {
    if (!this.allElements && this.books.length > 0) {
      const lastBook = this.books[this.books.length - 1]
      if (this.bookFilter.titleSort) {
        this.bookFilter.titleSort.maxValue = lastBook.title
      }
      if (this.bookFilter.authorSort) {
        this.bookFilter.authorSort.maxValue = lastBook.author
      }
      await this.retrieve()
    }
  }

  public nameClick (direction: SortDirection): void {
    this.nameDirection = direction
    this.authorDirection = null

    this.bookFilter.titleSort = new SortValue<string>(undefined, direction)
    this.bookFilter.authorSort = undefined

    this.retrieve()
  }

  public authorClick (direction: SortDirection): void {
    this.authorDirection = direction
    this.nameDirection = null

    this.bookFilter.titleSort = undefined
    this.bookFilter.authorSort = new SortValue<string>(undefined, direction)

    this.retrieve()
  }

  public know100Click (select: boolean): void {
    this.know100 = select
    this.bookFilter.know100Filter = select

    if (this.bookFilter.titleSort) this.bookFilter.titleSort.maxValue = undefined
    if (this.bookFilter.authorSort) this.bookFilter.authorSort.maxValue = undefined

    this.retrieve()
  }

  public know90Click (select: boolean): void {
    this.know90 = select
    this.bookFilter.know90Filter = select

    if (this.bookFilter.titleSort) this.bookFilter.titleSort.maxValue = undefined
    if (this.bookFilter.authorSort) this.bookFilter.authorSort.maxValue = undefined

    this.retrieve()
  }

  public know50Click (select: boolean): void {
    this.know50 = select
    this.bookFilter.know50Filter = select

    if (this.bookFilter.titleSort) this.bookFilter.titleSort.maxValue = undefined
    if (this.bookFilter.authorSort) this.bookFilter.authorSort.maxValue = undefined

    this.retrieve()
  }

  public know0Click (select: boolean): void {
    this.know0 = select
    this.bookFilter.know0Filter = select

    if (this.bookFilter.titleSort) this.bookFilter.titleSort.maxValue = undefined
    if (this.bookFilter.authorSort) this.bookFilter.authorSort.maxValue = undefined

    this.retrieve()
  }
}
</script>
