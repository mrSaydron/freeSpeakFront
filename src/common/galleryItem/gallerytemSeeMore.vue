<template>
  <v-card
    class="ma-2"
    height="260"
    width="200"
    flat
    @click="itemClick"
  >
    <v-img
      height="200"
    ></v-img>
    <v-card-title class="text-subtitle-1 pt-1">
      {{ galleryItem.title }}
    </v-card-title>
  </v-card>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Prop, Vue } from 'vue-property-decorator'
import { GalleryItemSeeMoreDto } from '@/model/galleryItem/galleryItemSeeMoreDto'

@Component({
  components: {}
})
export default class GalleryItemSeeMore extends Vue {
  @Prop(Object) readonly galleryItem?: GalleryItemSeeMoreDto

  public itemClick (): void {
    if (this.galleryItem && this.galleryItem.routeName) {
      this.$router.push({ name: this.galleryItem?.routeName })
    }
  }
}
</script>

<style scoped>

</style>
