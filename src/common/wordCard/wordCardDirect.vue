<template>
  <v-card
    class="d-flex flex-column"
    v-if="card && card.userWord && card.userWord.word && word"
  >
    <!-- первая строка -->
    <v-container>
      <v-row>
        <v-col cols="4"></v-col>
        <v-col cols="4">
          <v-card-title class="justify-center">
            {{ word.word }}
            <v-icon
              class="mr-1"
              @click="play"
            >
              mdi-volume-high
            </v-icon>
          </v-card-title>
        </v-col>
        <v-col cols="4">
          <v-rating
            class="text-right"
            length="7"
            :value="card.wordProgress.boxNumber"
            small
            readonly
          ></v-rating>
        </v-col>
      </v-row>
    </v-container>

    <!-- вторая строка -->
    <v-card-text class="text-center">
      <div v-if="isTurn">
        {{ word.translate }}
      </div>
      {{ word.partOfSpeechNote.name }}
      <v-tooltip
        v-if="word.partOfSpeechNote.description"
        bottom
      >
        <template
          v-slot:activator="{ on, attrs }"
        >
          <v-icon
            class="pl-2"
            color="blue"
            v-bind="attrs"
            v-on="on"
          >mdi-information</v-icon>
        </template>
        <span>{{ word.partOfSpeechNote.description }}</span>
      </v-tooltip>
    </v-card-text>

    <!-- третья строка -->
    <v-card-actions class="d-flex justify-center">
      <v-btn
        v-if="canToKnow"
        text
        color="error"
        @click="notRemember"
      >
        <v-icon class="mr-1">mdi-arrow-left</v-icon>
        УЧИТЬ
      </v-btn>
      <v-btn
        v-else
        text
        color="error"
        @click="notRemember"
      >
        <v-icon class="mr-1">mdi-arrow-left</v-icon>
        НЕ ПОМНЮ
      </v-btn>
      <v-btn
        v-if="isTurn"
        text
        @click="turn"
      >
        СКРЫТЬ ПЕРЕВОД
        <v-icon class="ml-1">mdi-arrow-up</v-icon>
      </v-btn>
      <v-btn
        v-else
        text
        @click="turn"
      >
        ПЕРЕВОД
        <v-icon class="ml-1">mdi-arrow-up</v-icon>
      </v-btn>
      <v-btn
        v-if="canToKnow"
        text
        @click="know"
      >
        ЗНАЮ
        <v-icon class="ml-1">mdi-arrow-right</v-icon>
      </v-btn>
      <v-btn
        v-else
        text
        @click="remember"
      >
        ПОМНЮ
        <v-icon class="ml-1">mdi-arrow-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Inject, Prop, Vue, Watch } from 'vue-property-decorator'
import { WordDto } from '@/model/wordDto'
import FileService from '@/services/fileService'
import { Constants } from '@/model/enums/constants'
import { Card } from '@/model/card'

/**
 * Карточка для изучения слова. Прямой перевод, иностронное слово -> перевод
 */
@Component({
  components: {
  }
})
export default class WordCardDirect extends Vue {
  @Inject() readonly fileService!: FileService

  @Prop(Object) readonly card: Card | undefined

  public word: WordDto | null = null
  public isTurn = false

  public mounted (): void {
    console.log('card mounted')
    console.log(this.card)
    if (this.card) {
      this.wordChange(this.card)
    }
  }

  @Watch('card')
  public async wordChange (card: Card): Promise<void> {
    if (card.userWord.word) {
      this.isTurn = false
      this.word = card.userWord.word
      await this.play()
    }
  }

  public async play (): Promise<void> {
    if (this.word && this.word.audioId) {
      if (!this.word.audioUrl) {
        this.word.audioUrl = await this.fileService.getUrl(this.word.audioId)
      }
      const audio = new Audio(this.word.audioUrl)
      // audio.muted = true
      await audio.play()
    }
  }

  public turn (): void {
    this.isTurn = !this.isTurn
  }

  public notRemember (): void {
    this.isTurn = false
    this.$emit('not-remember')
  }

  public remember (): void {
    this.isTurn = false
    this.$emit('remember')
  }

  public know (): void {
    this.isTurn = false
    this.$emit('know')
  }

  /**
   * Если слово можно сразу перенести в последнюю коробку
   */
  get canToKnow (): boolean {
    return this.card !== undefined &&
      this.card.answerFailCount === 0 &&
      this.card.wordProgress.boxNumber === Constants.PRELIMINARY_BOX_NUMBER
  }

  /**
   * Возвращает уровень знания для карточки
   */
  get getKnow (): number {
    let know = 1
    if (this.card && this.card.wordProgress && this.card.wordProgress.boxNumber) {
      know = this.card.wordProgress.boxNumber
    }
    return know
  }
}
</script>
