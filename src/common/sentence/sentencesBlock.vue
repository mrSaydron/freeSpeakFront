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
      :word-id="wordId"
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
  public wordId: number | null = null

  /**
   * Просмотр перевода слова
   * @param wordId
   */
  public wordClick (wordId: number): void {
    this.wordId = wordId
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
