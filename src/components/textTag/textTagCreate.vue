<template>
  <v-container>
    <v-form
      v-model="valid"
      lazy-validation
      ref="form"
    >
      <v-btn
        :disabled="!valid"
        @click="save"
      >СОХРАНИТЬ</v-btn>
      <v-text-field
        v-model="textTag.tagName"
        label="Наименование"
        required
        :rules="nameRules"
      ></v-text-field>
      <v-text-field
        v-model="textTag.typeName"
        label="Тип"
        required
        :rules="typeNameRules"
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
import { Inject, Vue } from 'vue-property-decorator'
import TextTagCombobox from '@/common/textTag/textTagCombobox.vue'
import { TextTagDto } from '@/model/textTagDto'
import TextTagService from '@/services/textTagService'

@Component({
  components: {
    TextTagCombobox
  }
})
export default class TextTagCreate extends Vue {
  @Inject() readonly textTagService!: TextTagService

  public textTag: TextTagDto = {}
  public valid = false

  public async save () {
    if (this.valid) {
      await this.textTagService.create(this.textTag)
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
