<template>
  <v-combobox
    v-if="tags && tags.length > 0"
    v-model="comboboxValue"
    :items="tags"
    label="Родительский тег"
    :item-text="itemText"
    :item-value="itemValue"
    @change="change()"
    clearable
    hide-selected
  ></v-combobox>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Inject, Prop, Vue, Watch } from 'vue-property-decorator'
import TextTagService from '@/services/textTagService'
import { TextTagDto } from '@/model/textTagDto'

@Component({
  components: {
  }
})
export default class TextTagCombobox extends Vue {
  @Inject() readonly textTagService!: TextTagService

  @Prop(Object) readonly value?: TextTagDto
  public comboboxValue: TextTagDto | null = null

  public tags: TextTagDto[] = []

  public async mounted () {
    this.tags = await this.textTagService.getAll()
    this.comboboxValue = this.value ? this.value : null
  }

  @Watch('value')
  public valueWatch (value: TextTagDto) {
    this.comboboxValue = value
  }

  public change () {
    this.$emit('input', this.comboboxValue)
  }

  public itemText (tag: TextTagDto): string {
    return tag.tagName || ''
  }

  public itemValue (tag: TextTagDto): number {
    return tag.id || 0
  }
}
</script>

<style scoped>

</style>
