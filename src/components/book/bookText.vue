<template>
  <v-container v-if="bookSentencesUnion">
    <span
      v-for="bookSentence in bookSentencesUnion.sentencesDto"
      :key="bookSentence.id"
    >
      <sentence
        :book-sentence="bookSentence"
        @word-click="wordClick"
        v-intersect.quiet="sentenceIntersect"
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
import { Inject, Prop, Vue } from 'vue-property-decorator'
import { WordDto } from '@/model/wordDto'
import WordService from '@/services/wordService'
import FileService from '@/services/fileService'
import Sentence from '@/common/sentence/sentence.vue'
import SentenceWord from '@/common/sentence/sentenceWord.vue'
import { BookSentenceUnionDto } from '@/model/bookSentenceUnionDto'
import { BookSentenceHasWordDto } from '@/model/bookSentenceHasWordDto'

@Component({
  components: {
    Sentence,
    SentenceWord
  }
})
export default class BookText extends Vue {
  @Prop(Object) readonly bookSentencesUnion?: BookSentenceUnionDto

  @Inject() readonly wordService!: WordService
  @Inject() readonly fileService!: FileService

  public wordModal = false
  public wordId: number | null = null
  public wordDto: WordDto = {}
  public word: BookSentenceHasWordDto | null = null
  public translate = ''
  public userHas = false
  public bookmarkSentenceId?: number
  public firstReset = false // должен отработать только при загрузке книги
  public directUp = true // угадывание направление скрола

  public updated (): void {
    if (this.bookSentencesUnion && !this.firstReset) {
      this.firstReset = true
      this.bookmarkReset(this.bookSentencesUnion)
    }
  }

  /**
   * Инициализируем переменную с идентификатором верхнего предложения, и прокручиваем страницу до него
   * @param bookSentencesUnion
   */
  public bookmarkReset (bookSentencesUnion: BookSentenceUnionDto): void {
    if (
      bookSentencesUnion.bookDto.id &&
      bookSentencesUnion.sentencesDto &&
      bookSentencesUnion.sentencesDto.length > 0
    ) {
      const sentenceId = localStorage.getItem('book_' + bookSentencesUnion.bookDto.id)
      if (sentenceId) {
        this.bookmarkSentenceId = parseInt(sentenceId)
      } else {
        this.bookmarkSentenceId = bookSentencesUnion.sentencesDto[0].id
        if (this.bookmarkSentenceId) {
          localStorage.setItem('book_' + bookSentencesUnion.bookDto.id, this.bookmarkSentenceId.toString())
        }
      }
      if (
        bookSentencesUnion.sentencesDto &&
        bookSentencesUnion.sentencesDto.length > 0 &&
        this.bookmarkSentenceId !== bookSentencesUnion.sentencesDto[0].id
      ) {
        this.goToSentence()
      }
    }
  }

  public goToSentence (): void {
    const sentence = window.document.getElementById('sentence_id_' + this.bookmarkSentenceId)
    if (sentence) {
      sentence.scrollIntoView()
    }
  }

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

  /**
   * Отслеживает видимость предложений и созраняет его локальном хранилище
   * Работает, но не очень точно сохраняет последнюю позицию
   */
  public sentenceIntersect (entries: any, observer: any, isIntersecting: any): void {
    if (this.bookmarkSentenceId && this.bookSentencesUnion && entries.length > 0) {
      const sentenceIdString = entries[0].target.id.substring(12)
      if (sentenceIdString) {
        const sentenceId = parseInt(sentenceIdString)
        if (isIntersecting) {
          // элемент скрылся
          if (!this.directUp) {
            // думаем что движемся вниз (но это не точно)
            // примем скрывшийся элемент за верхнюю строку
            this.bookmarkSentenceId = sentenceId
            localStorage.setItem('book_' + this.bookSentencesUnion.bookDto.id, this.bookmarkSentenceId.toString())
          }
        } else {
          // элемент появился
          // определеним направление
          if (sentenceId < this.bookmarkSentenceId) {
            // движемя вверх
            this.directUp = true
            // можно сохранить
            this.bookmarkSentenceId = sentenceId
            localStorage.setItem('book_' + this.bookSentencesUnion.bookDto.id, this.bookmarkSentenceId.toString())
          } else {
            // движемся вниз
            this.directUp = false
          }
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
