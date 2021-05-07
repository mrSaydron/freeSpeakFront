<template>
  <v-card>
    <v-card-title class="justify-center">
      {{ word.word }}
    </v-card-title>
    <v-card-actions class="justify-center">
      <v-btn
        text
        color="error"
        @click="notRemember"
      >
        Not remember
      </v-btn>
      <v-btn
        text
        @click="remember"
      >
        Remember
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Vue, Prop } from 'vue-property-decorator'
import { WordDto } from '@/model/wordDto'

/**
 * Карточка для изучения слова. Прямой перевод, иностронное слово -> перевод
 */
@Component({
  components: {
  }
})
export default class WordCardDirect extends Vue {
  @Prop(Object) readonly word: WordDto | undefined

  public notRemember (): void {
    this.$emit('not-remember')
  }

  public remember (): void {
    this.$emit('remember')
  }
}
</script>
