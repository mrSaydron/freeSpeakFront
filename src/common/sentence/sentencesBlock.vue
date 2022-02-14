<template>
  <v-container v-if="bookSentences">
    <span
      v-for="bookSentence in bookSentences"
      :key="bookSentence.id"
    >
      <sentence
        :book-sentence="bookSentence"
        @word-click="wordClick"
        :id="'sentence_id_' + bookSentence.id"
      ></sentence>
    </span>
    <sentence-word
      :word="word"
      :word-modal="wordModal"
      @modal-close="modalClose"
    ></sentence-word>
  </v-container>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import Sentence from './sentence.vue'
import SentenceWord from './sentenceWord.vue'
import { Inject, Prop, Vue } from 'vue-property-decorator'
import WordService from '@/services/wordService'
import FileService from '@/services/fileService'
import { BookSentenceDto } from '@/model/bookSentenceDto'
import { BookSentenceHasWordDto } from '@/model/bookSentenceHasWordDto'

/**
 * Блок из несколькоих предложений
 */
@Component({
  components: {
    Sentence,
    SentenceWord
  }
})
export default class SentencesBlock extends Vue {
  @Prop(Array) readonly bookSentences?: BookSentenceDto[]

  @Inject() readonly wordService!: WordService
  @Inject() readonly fileService!: FileService

  public wordModal = false
  public word: BookSentenceHasWordDto | null = null

  /**
   * Просмотр перевода слова
   */
  public wordClick (word: BookSentenceHasWordDto): void {
    this.word = word
    this.wordModal = true
  }

  /**
   * Закрытие окна сереводом слова
   */
  public modalClose (): void {
    this.wordModal = false
  }
}
</script>

<style scoped>

</style>
