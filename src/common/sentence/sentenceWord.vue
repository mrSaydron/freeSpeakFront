<template>
  <v-dialog
    v-model="modal"
    max-width="450px"
  >
    <v-card>
      <v-card-title>
        {{ wordBase }}
        <div
          class="pl-3"
          v-if="partOfSpeech !== partOfSpeechInText && partOfSpeechInText"
        >({{ wordInText }}: {{ partOfSpeechInText.name }})
        </div>
      </v-card-title>
      <v-card-text>
        <p v-if="partOfSpeech">{{ partOfSpeech.name }}</p>
        <p>{{ translate }}</p>
        <v-rating
          v-if="userWordDto.averageBox > 0"
          length="7"
          :value="userWordDto.averageBox"
          small
          readonly
        ></v-rating>
      </v-card-text>
      <v-card-actions>
        <div v-if="userWordDto.id">
          <v-btn
            text
            @click="eraseWord"
            v-if="userWordDto.averageBox > START_BOX_NUMBER"
          >Сбросить прогресс</v-btn>

          <v-btn
            text
            @click="knowWord"
            v-if="userWordDto.averageBox < KNOW_BOX_NUMBER"
          >Знаю</v-btn>
        </div>
        <div v-else>
          <v-btn
            text
            @click="addWord"
          >Учить</v-btn>

          <v-btn
            text
            @click="knowWord"
          >Знаю</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Inject, Prop, Vue, Watch } from 'vue-property-decorator'
import FileService from '../../services/fileService'
import { PartOfSpeechEnum } from '@/model/enums/partOfSpeechEnum'
import UserWordService from '@/services/userWordService'
import { UserWordDto } from '@/model/userWordDto'
import { Constants } from '@/model/enums/constants'
import { PartOfSpeechDto } from '@/model/partOfSpeechDto'
import { BookSentenceHasWordDto } from '@/model/bookSentenceHasWordDto'

/**
 * Модальное окно с информацией о слове
 */
@Component({
  components: {
  }
})
export default class SentenceWord extends Vue {
  @Prop(Boolean) readonly wordModal: boolean | undefined
  @Prop(Object) readonly word: BookSentenceHasWordDto | undefined

  @Inject() readonly userWordService!: UserWordService
  @Inject() readonly fileService!: FileService

  public START_BOX_NUMBER = Constants.START_BOX_NUMBER
  public KNOW_BOX_NUMBER = Constants.KNOW_BOX_NUMBER

  public modal = false
  public userWordDto: UserWordDto = {}
  public wordBase = ''
  public wordInText = ''
  public translate = ''
  public partOfSpeech: PartOfSpeechDto | null = null
  public partOfSpeechInText: PartOfSpeechDto | null = null

  @Watch('modal')
  public modalWatch (modal: boolean): void {
    if (!modal) {
      this.$emit('modal-close')
    }
  }

  @Watch('wordModal')
  public async wordModalWatch (wordModal: boolean): Promise<void> {
    this.modal = wordModal
    if (wordModal) {
      this.reset()
      if (this.word && this.word.translateId) {
        this.userWordDto = await this.userWordService.get(this.word.translateId)
        if (this.userWordDto && this.userWordDto.word) {
          this.wordBase = this.userWordDto.word.word || ''
          this.translate = this.userWordDto.word.translate || ''
          this.partOfSpeech = this.userWordDto.word.partOfSpeech ? PartOfSpeechEnum[this.userWordDto.word.partOfSpeech] : null
        }

        if (this.word && this.word.word) {
          this.wordInText = this.word.word
          this.partOfSpeechInText = this.word.partOfSpeech ? PartOfSpeechEnum[this.word.partOfSpeech] : null
        }

        if (this.userWordDto && this.userWordDto.word && this.userWordDto.word.audioId) {
          this.userWordDto.word.audioUrl = await this.fileService.getUrl(this.userWordDto.word.audioId)
          const audio = new Audio(this.userWordDto.word.audioUrl)
          await audio.play()
        }
      }
    }
  }

  public eraseWord (): void {
    if (this.word && this.word.translateId) {
      this.userWordService.eraseWord(this.word.translateId)
      this.modal = false
    }
  }

  public knowWord (): void {
    if (this.word && this.word.translateId) {
      this.userWordService.knowWord(this.word.translateId)
      this.modal = false
    }
  }

  public addWord (): void {
    if (this.word && this.word.translateId) {
      this.userWordService.addWord(this.word.translateId)
      this.modal = false
    }
  }

  public reset (): void {
    this.userWordDto = {}
    this.wordBase = ''
    this.wordInText = ''
    this.translate = ''
    this.partOfSpeech = null
    this.partOfSpeechInText = null
  }
}
</script>

<style scoped>

</style>
