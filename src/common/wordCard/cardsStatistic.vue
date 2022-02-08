<template>
  <v-container>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <span
          v-bind="attrs"
          v-on="on"
        >{{ successCards }}</span>
      </template>
      <span>Успешных ответов</span>
    </v-tooltip>
     /
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <span
          v-bind="attrs"
          v-on="on"
        >{{ failCards }}</span>
      </template>
      <span>Ответов с ошибкой</span>
    </v-tooltip>
     /
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <span
          v-bind="attrs"
          v-on="on"
        >{{ leftCards }}</span>
      </template>
      <span>Карточек осталось</span>
    </v-tooltip>
    /
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <span
          v-bind="attrs"
          v-on="on"
        >{{ newCards }}</span>
      </template>
      <span>Новых карточек</span>
    </v-tooltip>
    /
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <span
          v-bind="attrs"
          v-on="on"
        >{{ knowCards }}</span>
      </template>
      <span>Знакомых карточек</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          class="pl-2"
          color="blue"
          v-bind="attrs"
          v-on="on"
        >mdi-information</v-icon>
      </template>
      <span>Статичтика урока. Для справки наведеите мышку на число</span>
    </v-tooltip>
  </v-container>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Prop, Vue, Watch } from 'vue-property-decorator'
import { Card } from '@/model/card'

@Component({
  components: {
  }
})
export default class CardsStatistic extends Vue {
  @Prop({ default: 0 }) readonly successCards!: number
  @Prop({ default: 0 }) readonly failCards!: number
  @Prop({ default: 0 }) readonly leftCards!: number
  @Prop({ default: 0 }) readonly newCards!: number
  @Prop({ default: 0 }) readonly knowCards!: number
}
</script>

<style scoped>

</style>
