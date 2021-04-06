<template>
  <v-container>
<!--    <v-text-field-->
<!--      v-model="searchString"-->
<!--      label="Слово или перевод"-->
<!--      clearable-->
<!--      prepend-inner-icon="mdi-magnify"-->
<!--    ></v-text-field>-->
<!--    <v-data-table-->
<!--      :headers="headers"-->
<!--      :items="words"-->
<!--      :items-per-page="Number.MAX_VALUE"-->
<!--      hide-default-footer-->
<!--      @update:sort-by="updateSortBy"-->
<!--      @update:sort-desc="updateSortDesc"-->
<!--      :server-items-length="words.length"-->
<!--      :sort-by.sync="sortBy"-->
<!--      :sort-desc.sync="sortDesc"-->
<!--    >-->
    <v-data-table
      :headers="headers"
      :items="words"
      :items-per-page="Number.MAX_VALUE"
      hide-default-footer
    >
<!--      <template v-slot:item.action="{ item }">-->
<!--        <v-icon-->
<!--          v-if="!item.userHas"-->
<!--          class="mr-2"-->
<!--          @click="addWord(item)"-->
<!--        >-->
<!--          mdi-plus-->
<!--        </v-icon>-->
<!--        <v-icon-->
<!--          v-else-->
<!--          @click="removeWord(item)"-->
<!--        >-->
<!--          mdi-close-->
<!--        </v-icon>-->
<!--      </template>-->
    </v-data-table>
<!--    <div v-intersect="next"></div>-->
  </v-container>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Inject, Vue, Watch } from 'vue-property-decorator'
import UserWordService from '@/services/userWordService'
import { UserWordDto } from '@/model/userWordDto'

@Component({
  components: {}
})
export default class MyDictionary extends Vue {
  @Inject() readonly userWordService!: UserWordService

  public requestCount = 20
  public allElements = false
  public words: UserWordDto[] = []

  // public loading = false
  // public sortBy: string[] = ['word']
  // public sortDesc: boolean[] = [false]
  //
  // public searchString = ''
  // public wordSort?: SortValue<string | undefined> = new SortValue(undefined, asc)
  // public amountSort?: SortValue<number | undefined>

  public headers = [
    {
      text: 'Слово',
      value: 'word.word',
      sortable: true
    },
    {
      text: 'Перевод',
      value: 'word.translate',
      sortable: false
    },
    {
      text: 'Часть речи',
      value: 'word.partOfSpeechNote',
      sortable: false
    },
    {
      text: 'Коробка',
      value: 'averageBox',
      sortable: true
    }
  ]

  public async mounted () {
    this.words = await this.retrieve()
  }

  // @Watch('searchString')
  // public async searchChange (wordFilter: string, oldWordFilter: string) {
  //   this.loading = true
  //   if (this.wordSort) {
  //     this.wordSort.maxValue = undefined
  //   }
  //   if (this.amountSort) {
  //     this.amountSort.maxValue = undefined
  //   }
  //   this.words = await this.retrieve()
  //   this.loading = false
  // }
  //
  // public async next () {
  //   if (!this.allElements && this.words.length > 0) {
  //     const wordDto: WordDto = this.words[this.words.length - 1]
  //     if (this.wordSort) {
  //       this.wordSort.maxValue = wordDto.word
  //     }
  //     if (this.amountSort) {
  //       this.amountSort.maxValue = wordDto.totalAmount
  //     }
  //     const nextWords = await this.retrieve()
  //     this.words = this.words.concat(nextWords)
  //   }
  // }
  //
  // public async updateSortBy (value: string[]): Promise<void> {
  //   const item = value[0]
  //   if (item === 'word') {
  //     this.wordSort = new SortValue(undefined, asc)
  //     this.amountSort = undefined
  //   } else if (item === 'frequencyPercent') {
  //     this.wordSort = undefined
  //     this.amountSort = new SortValue(undefined, asc)
  //   }
  //
  //   this.words = await this.retrieve()
  // }
  //
  // public async updateSortDesc (value: boolean[]): Promise<void> {
  //   const direction = value[0]
  //   if (this.wordSort) {
  //     this.wordSort.sortDirection = direction ? desc : asc
  //   }
  //   if (this.amountSort) {
  //     this.amountSort.sortDirection = direction ? desc : asc
  //   }
  //
  //   this.words = await this.retrieve()
  // }

  private async retrieve (): Promise<UserWordDto[]> {
    const words = await this.userWordService.retrieve()
    this.allElements = words.length < this.requestCount
    return words
  }

  // private static fillWord (word: WordDto) {
  //   if (word.frequency) {
  //     word.frequencyPercent = (word.frequency * 100).toFixed(2) + ' %'
  //   }
  //   if (word.partOfSpeech) {
  //     word.partOfSpeechNote = PartOfSpeechEnum[word.partOfSpeech]
  //   }
  // }
}
</script>
