<template>
  <v-card v-if="card && card.userWord && card.userWord.word && word">
    <v-card-title class="justify-center">
      {{ word.word }}
      <v-icon
        class="mr-1"
        @click="play"
      >
        mdi-volume-high
      </v-icon>
    </v-card-title>
    <v-card-text class="text-center">
      <div v-if="isTurn">
        {{ word.translate }}
      </div>
      {{ word.partOfSpeechNote }}
    </v-card-text>
    <v-card-actions>
      <v-container>
        <v-row
          justify="center"
        >
          <v-col md="3" class="text-right">
            <v-btn
              text
              color="error"
              @click="notRemember"
              @keypress.left="notRemember"
            >
              <v-icon class="mr-1">
                mdi-arrow-left
              </v-icon>
              НЕ ПОМНЮ
            </v-btn>
          </v-col>
          <v-col md="3" class="text-center">
            <v-btn
              text
              @click="turn"
            >
              ПЕРЕВЕРНУТЬ
              <v-icon class="ml-1">mdi-arrow-up</v-icon>
            </v-btn>
          </v-col>
          <v-col md="3" class="text-left">
            <v-btn
              v-if="canToKnow"
              text
              @click="remember"
              @keypress.right="remember"
            >
              ИЗУЧАТЬ
              <v-icon class="ml-1">mdi-arrow-right</v-icon>
            </v-btn>
            <v-btn
              v-else
              text
              @click="remember"
              @keypress.right="remember"
            >
              ПОМНЮ
              <v-icon class="ml-1">
                mdi-arrow-right
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row
          justify="center"
          v-if="canToKnow"
        >
          <v-col md="3" class="text-center">
            <v-btn
              text
              class="text-center"
              @click="know"
            >
              ЗНАЮ
              <v-icon class="ml-1">
                mdi-arrow-down
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
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
    return this.card !== undefined && this.card.answerFailCount === 0 &&
      (this.card.userWord.fromTest || this.card.wordProgress.boxNumber === Constants.PRELIMINARY_BOX_NUMBER)
  }
}
</script>
