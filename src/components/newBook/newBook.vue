<template>
  <v-form
    v-model="valid"
    lazy-validation
    ref="form"
  >
    <v-container>
      <v-row>
        <v-col cols="3">
          <v-img
            v-if="imageSrc"
            :src="imageSrc"
            height="300"
          ></v-img>
          <v-btn v-else>
            Добавить картинку
          </v-btn>
        </v-col>
        <v-col cols="9">
          <v-btn
            :disabled="!valid"
            @click="save"
          >Сохранить</v-btn>
          <v-menu
            bottom
            left
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <v-list-item-title>Добавить картинку</v-list-item-title>
              </v-list-item>
              <v-list-item @click="loadText">
                <v-list-item-title>Добавить текст</v-list-item-title>
              </v-list-item>
              <v-list-item @click="clearText">
                <v-list-item-title>Очистить текст</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-text-field
            v-model="book.title"
            label="Название книги"
            required
            :rules="titleRules"
          ></v-text-field>
          <v-text-field
            v-model="book.author"
            label="Автор"
          ></v-text-field>
          <v-text-field
            v-model="book.source"
            label="Источник"
          ></v-text-field>
          <v-checkbox
            v-model="book.publicBook"
            label="Публичная"
            required
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row class="mt-3">
        <v-textarea
          ref="bookText"
          name="bookText"
          label="Текст книги"
          auto-grow
          v-model="book.text"
          :rules="textRules"
        ></v-textarea>
        <input
          ref="inputLoadText"
          type="file"
          style="display: none"
          accept="text/*"
          @change="onTextChange"
        >
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Inject, Vue } from 'vue-property-decorator'
import BookService from '@/services/bookService'
import { BookDto } from '@/model/bookDto'

@Component({
  components: {
  }
})
export default class Library extends Vue {
  @Inject() readonly bookService!: BookService

  public imageSrc: string | undefined = 'http://hq-oboi.ru/photo/kotik_kak_pushistyy_komochek_1920x1200.jpg'
  public book: BookDto = new BookDto()
  public valid = false

  public titleRules = [
    (v: string): boolean | string => !!v || 'Название книги обязательно к заполнению',
    (v: string): boolean | string => (v && v.length >= 3) || 'Название книги не может быть меньше трех символов'
  ];

  public textRules = [
    (v: string): boolean | string => !!v || 'Необходимо ввести текст для книги',
    (v: string): boolean | string => (v && v.length >= 1) || 'В книге должен быть хотя бы один символ'
  ];

  public clearText () {
    this.book.text = ''
  }

  public loadText () {
    const fileModal: any = this.$refs.inputLoadText
    fileModal.click()
  }

  public onTextChange (event: any) {
    const file: File = event.target.files[0]
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
      this.book.text = reader.result
    }
  }

  public async save () {
    const form: any = this.$refs.form
    if (form.validate()) {
      await this.bookService.create(this.book)
      this.$router.push('/library')
    }
  }
}
</script>
