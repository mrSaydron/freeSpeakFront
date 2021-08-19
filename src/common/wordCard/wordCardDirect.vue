<template>
  <v-card>
    <v-card-title class="justify-center">
      <div v-if="!isTurn">
        {{ word.word }}
      </div>
      <div v-else>
        {{ word.translate }}
      </div>
    </v-card-title>
    <v-card-text class="text-center">
      {{ word.partOfSpeechNote }}
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
export default class WordCardDirect extends Vue {
  @Inject() readonly fileService!: FileService

  @Prop(Object) readonly word: WordDto | undefined

  public isTurn = false

  @Watch('word')
  public async wordChange (word: WordDto) {
    this.isTurn = false

    if (word && word.audioId) {
      if (!word.audioUrl) {
        word.audioUrl = await this.fileService.getUrl(word.audioId)
      }
      const audio = new Audio(word.audioUrl)
      await audio.play()
    }
  }

  public notRemember (): void {
    if (this.isTurn) {
      this.$emit('not-remember')
    } else {
      this.isTurn = !this.isTurn
    }
  }

  public remember (): void {
    if (this.isTurn) {
      this.$emit('remember')
    } else {
      this.isTurn = !this.isTurn
    }
  }
}
</script>
