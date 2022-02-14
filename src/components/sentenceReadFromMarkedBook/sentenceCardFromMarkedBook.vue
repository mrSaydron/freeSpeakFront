<template>
  <v-card class="d-flex flex-column">
    <v-card-text
      v-if="sentence.beforeSentences"
      class="pl-12 pr-12 pb-0"
    >
      <sentences-block
        :book-sentences="sentence.beforeSentences"
      />
    </v-card-text>
    <v-card-text
      class="pt-0 pb-0 text-h6 black--text"
    >
      <sentence
        :book-sentence="bookSentence"
        @word-click="wordClick"
      ></sentence>
    </v-card-text>
    <v-card-text
      v-if="sentence.afterSentences"
      class="pl-12 pr-12 pt-0"
    >
      <sentences-block
        :book-sentences="sentence.afterSentences"
      />
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn
        text
        @click="translate"
        @keypress.right="translate"
      >
        ВСЕ ПОНЯТНО
        <v-icon class="ml-1">
          mdi-arrow-right
        </v-icon>
      </v-btn>
    </v-card-actions>
    <sentence-word
      :wordModal="wordModal"
      :word="word"
      @modal-close="modalClose"
    ></sentence-word>
  </v-card>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Prop, Vue, Watch } from 'vue-property-decorator'
import { BookSentenceReadDto } from '@/model/bookSentenceReadDto'
import Sentence from '@/common/sentence/sentence.vue'
import { BookSentenceDto } from '@/model/bookSentenceDto'
import SentenceWord from '@/common/sentence/sentenceWord.vue'
import SentencesBlock from '@/common/sentence/sentencesBlock.vue'
import { BookSentenceHasWordDto } from '@/model/bookSentenceHasWordDto'

/**
 * Предложение для перевода
 */
@Component({
  components: {
    Sentence,
    SentenceWord,
    SentencesBlock
  }
})
export default class SentenceCardFromMarkedBook extends Vue {
  @Prop(Object) readonly sentence: BookSentenceReadDto | undefined

  public bookSentence: BookSentenceDto | null = null
  public wordModal = false
  public word: BookSentenceHasWordDto | null = null

  public async mounted () {
    if (this.sentence) {
      this.bookSentence = new BookSentenceDto(this.sentence.id, this.sentence.words)
    }
  }

  @Watch('sentence')
  public async sentenceChange (sentence: BookSentenceReadDto): Promise<void> {
    this.bookSentence = new BookSentenceDto(sentence.id, sentence.words)
  }

  public translate (): void {
    this.$emit('translate')
  }

  public wordClick (word: BookSentenceHasWordDto): void {
    this.word = word
    this.wordModal = true
  }

  public modalClose (): void {
    this.wordModal = false
  }
}
</script>

<style scoped>

</style>
