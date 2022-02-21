<template>
  <v-container>
    <v-form
      v-model="valid"
      lazy-validation
      ref="form"
    >
      <v-btn
        :disabled="!valid"
        @click="update"
      >СОХРАНИТЬ</v-btn>
      <v-text-field
        v-model="textTag.id"
        label="Id"
        required
        disabled
      ></v-text-field>
      <v-text-field
        v-model="textTag.tagName"
        label="Наименование"
        required
        :rules="textTag.nameRules"
      ></v-text-field>
      <v-text-field
        v-model="textTag.typeName"
        label="Тип"
        required
        :rules="textTag.typeNameRules"
      ></v-text-field>
      <text-tag-combobox
        v-model="textTag.parent"
        :multiply="false"
        @input="onParentTag"
      ></text-tag-combobox>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Inject, Prop, Vue } from 'vue-property-decorator'
import TextTagService from '@/services/textTagService'
import { TextTagDto } from '@/model/textTagDto'
import TextTagCombobox from '@/common/textTag/textTagCombobox.vue'

@Component({
  components: {
    TextTagCombobox
  }
})
export default class TextTag extends Vue {
  @Inject() readonly textTagService!: TextTagService

  @Prop(String) readonly id?: string

  public textTag: TextTagDto = {}
  public valid = false

  public async mounted () {
    if (this.id) {
      this.textTag = await this.textTagService.get(Number(this.id))
    }
  }

  public async update () {
    if (this.valid) {
      await this.textTagService.update(this.textTag)
      await this.$router.push({ name: 'textTags' })
    }
  }

  public onParentTag (tag: TextTagDto) {
    this.textTag.parent = tag
  }

  public nameRules = [
    (v: string): boolean | string => !!v || 'Название обязательно к заполнению',
    (v: string): boolean | string => (v && v.length >= 3) || 'Название не может быть меньше трех символов'
  ];

  public typeNameRules = [
    (v: string): boolean | string => !!v || 'Тип обязателен к заполнению',
    (v: string): boolean | string => (v && v.length >= 3) || 'Тип не может быть меньше трех символов'
  ];
}
</script>

<style scoped>

</style>
