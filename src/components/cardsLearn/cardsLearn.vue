<template>
  <v-container>
    <v-row>
      <v-col>
        <v-rating
          length="10"
          :value="leftHearts"
          readonly
          color="red"
          background-color="red lighten-2"
          empty-icon="mdi-heart-outline"
          full-icon="mdi-heart"
        >
        </v-rating>
      </v-col>
      <v-col>
        <cards-statistic
          class="text-right"
          :success-cards="successCards"
          :fail-cards="failCards"
          :left-cards="leftCards"
          :new-cards="newCards"
          :know-cards="knowCards"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <plug-card v-if="cardType === 'plug'"/>
        <word-card-direct
          v-if="cardType === 'direct'"
          :card="card"
          @not-remember="answerFail"
          @remember="answerSuccess"
          @know="knowWord"
        ></word-card-direct>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Inject, Vue } from 'vue-property-decorator'
import WordCardDirect from '@/common/wordCard/wordCardDirect.vue'
import UserWordService from '@/services/userWordService'
import { SortValue } from '@/util/sortValue'
import { Card } from '@/model/card'
import { UserWordDto } from '@/model/userWordDto'
import { Constants } from '@/model/enums/constants'
import CardsStatistic from '@/common/wordCard/cardsStatistic.vue'
import PlugCard from '@/common/wordCard/plugCard.vue'

@Component({
  components: {
    WordCardDirect,
    CardsStatistic,
    PlugCard
  }
})
export default class CardsLearn extends Vue {
  @Inject() readonly userWordService!: UserWordService

  public card: Card | null = null
  public cards: Card[] = []
  public leftHearts = 0

  public requestCount = 10
  public allElements = false
  public wordSort?: SortValue

  public successCards = 0 // успешных ответов
  public failCards = 0 // ответов с ошибкой
  public leftCards = 0 // карточек осталось
  public newCards = 0 // новых карточек
  public knowCards = 0 // карточек отмеченных как знакомое слово

  public cardsGot = false // карточки получены с бэка

  public async mounted () {
    this.leftHearts = await this.userWordService.getLeftHearts()
    const words = await this.userWordService.getWordOfDay()
    this.cards = Card.transform(words)
    this.leftCards = this.cards.length

    if (this.cards.length === 0) {
      await this.nextNewWords()
    }
    if (this.cards.length > 0) {
      this.card = this.cards[0]
    }
    this.cardsGot = true
  }

  get word (): UserWordDto {
    return (this.card && this.card.userWord) || {}
  }

  get cardType (): string {
    let result = 'none'
    if (this.card && this.card.wordProgress && this.card.wordProgress.type) {
      result = this.card.wordProgress.type
    }
    if (this.cardsGot && !this.card) {
      result = 'plug'
    }
    return result
  }

  /**
   * Если пользователь ответил не вероно:
   * - отправляем сообщение на бэк
   * - слово оставляем до верного ответа
   * - если слов меньше 10, то загужаем следующие слова
   * - слово перемещаем на десять карточек назад
   * - если закончились "жизни" то все новые слова отбрасываются
   * - если слово в "нулевой коробке" то меняем ее на первую
   */
  public async answerFail (): Promise<void> {
    await this.userWordService.answerFail(this.card!)
    this.leftHearts--
    if (this.leftHearts < 0) this.leftHearts = 0

    if (this.card?.answerFailCount === 0) {
      if (this.card.wordProgress.boxNumber === Constants.PRELIMINARY_BOX_NUMBER) {
        this.newCards++
        this.leftCards++
      } else {
        this.failCards++
      }
    }

    this.card!.answerFailCount++
    if (this.leftHearts === 0) {
      this.cards = this.cards.filter(card =>
        card.wordProgress.boxNumber !== Constants.PRELIMINARY_BOX_NUMBER ||
        card.answerFailCount !== 0)
    }

    const currentCard = this.cards.shift()
    if (this.cards.length < 10) {
      await this.nextNewWords()
    }
    if (this.cards.length > 10) {
      this.cards.splice(9, 0, currentCard!)
    } else {
      this.cards.push(currentCard!)
    }
    this.card = this.cards[0]
  }

  /**
   * Если пользователь ответил верно:
   * - отправляем сообщение на бэк
   * - убираем слово из списка
   * - проверяем остались ли слова
   */
  public async answerSuccess (): Promise<void> {
    await this.userWordService.answerSuccess(this.card!)

    if (this.card?.answerFailCount === 0) {
      this.successCards++
    }
    this.leftCards--

    this.cards.shift()
    if (this.cards.length === 0) {
      await this.nextNewWords()
    }
    if (this.cards.length > 0) {
      this.card = this.cards[0]
    } else {
      this.card = null
    }
  }

  /**
   * Закончились слова, загружаем следующий блок еще не изученных слов
   */
  public async nextNewWords (): Promise<void> {
    if (!this.allElements && this.leftHearts > 0) {
      const excludeWordIds: number[] = this.cards
        .filter(card => card.wordProgress.boxNumber === Constants.PRELIMINARY_BOX_NUMBER)
        .map(card => card.userWord.word!.id!)
      const words = await this.userWordService.nextWords(excludeWordIds)
      this.allElements = words.length < this.requestCount
      this.cards = this.cards.concat(Card.transform(words))
    }
  }

  /**
   * Пользователь знает слово, оно переносится сразу в последнюю коробку
   */
  public async knowWord (): Promise<void> {
    await this.userWordService.knowWord(this.card!.userWord.word!.id!)

    this.cards.shift()
    if (this.cards.length === 0) {
      await this.nextNewWords()
    }
    if (this.cards.length > 0) {
      this.card = this.cards[0]
    } else {
      this.card = null
    }

    this.knowCards++
  }
}
</script>
