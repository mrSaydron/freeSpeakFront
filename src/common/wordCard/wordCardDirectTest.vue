<template>
  <v-card>
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
    <v-card-actions class="justify-center">
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

      <v-btn
        text
        @click="turn"
      >
        ПЕРЕВЕРНУТЬ
      </v-btn>

      <v-btn
        text
        @click="remember"
        @keypress.right="remember"
      >
        ПОМНЮ
        <v-icon class="ml-1">
          mdi-arrow-right
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Vue, Prop, Watch, Inject } from 'vue-property-decorator'
import { WordDto } from '@/model/wordDto'
import WordService from '@/services/wordService'
import FileService from '@/services/fileService'

/**
 * Карточка для изучения слова. Прямой перевод, иностронное слово -> перевод
 */
@Component({
  components: {
  }
})
export default class WordCardDirectTest extends Vue {
  @Inject() readonly fileService!: FileService

  @Prop(Object) readonly word: WordDto | undefined

  public isTurn = false

  public created () {
    document.addEventListener('keydown', this.pressKey)
  }

  public beforeDestroy () {
    document.removeEventListener('keydown', this.pressKey)
  }

  public pressKey (event: any) {
    if (this.word) {
      if (event.code === 'ArrowLeft') {
        this.notRemember()
      } else if (event.code === 'ArrowRight') {
        this.remember()
      } else if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
        this.turn()
      }
    }
  }

  public mounted (): void {
    if (this.word) {
      this.wordChange(this.word)
    }
  }

  @Watch('word')
  public async wordChange (word: WordDto): Promise<void> {
    this.isTurn = false
    await this.play()
  }

  public async play (): Promise<void> {
    if (this.word && this.word.audioId) {
      if (!this.word.audioUrl) {
        this.word.audioUrl = await this.fileService.getUrl(this.word.audioId)
      }
      const audio = new Audio(this.word.audioUrl)
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
}
</script>
