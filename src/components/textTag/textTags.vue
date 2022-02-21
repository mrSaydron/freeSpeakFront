<template>
  <v-container>
    <v-btn @click="toCreate">СОЗДАТЬ</v-btn>
    <v-data-table
      :headers="headers"
      :items="textTags"
      :disable-pagination="true"
      hide-default-footer
      item-key="id"
      :search="search"
      :custom-filter="filterFunction"
      @click:row="toTextTag"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Наименование или наименование родителя"
          class="mx-4"
          clearable
        ></v-text-field>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon @click.stop="remove(item)" >
          mdi-close
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Inject, Vue } from 'vue-property-decorator'
import TextTagService from '@/services/textTagService'
import { TextTagDto } from '@/model/textTagDto'
import { WordDto } from '@/model/wordDto'

@Component({
  components: {}
})
export default class TextTags extends Vue {
  @Inject() readonly textTagService!: TextTagService

  private textTags: TextTagDto[] = []
  private search = ''

  public headers = [
    {
      text: 'Id',
      value: 'id',
      sortable: true
    },
    {
      text: 'Имя',
      value: 'tagName',
      sortable: true
    },
    {
      text: 'Тип',
      value: 'typeName',
      sortable: true
    },
    {
      text: 'Родитель',
      value: 'parent.tagName',
      sortable: false
    },
    {
      text: '',
      value: 'action',
      sortable: false
    }
  ]

  public async mounted () {
    this.textTags = await this.textTagService.getAll()
  }

  public filterFunction (value: any, search: string | null, item: TextTagDto): boolean {
    return value != null &&
      search != null &&
      typeof value === 'string' &&
      value.toString().toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) !== -1
  }

  public remove (textTag: TextTagDto) {
    if (textTag && textTag.id) {
      this.textTagService.delete(textTag.id)
      this.textTags = this.textTags.filter(tag => tag.id !== textTag.id)
    }
  }

  public toCreate () {
    this.$router.push({ name: 'textTagCreate' })
  }

  public toTextTag (textTag: TextTagDto) {
    if (textTag && textTag.id) {
      this.$router.push({ name: 'textTag', params: { id: textTag.id.toString() } })
    }
  }
}
</script>

<style scoped>

</style>
