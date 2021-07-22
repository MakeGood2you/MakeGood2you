<template>
  <div class="row justify-center q-gutter-sm">
    <FsLightbox
        :toggler="isFullScreen.value"
        :sources="[isFullScreen.chosenPic]"
    />
    <div
        v-for="(pic, key) in localEvent.photos"
        :key="key"
        v-if="isDownload(pic)"
        class="crop"
    >
      <q-card

      >
        <q-img
            :src="pic.thumbs['256']"
            id="pic"
            :ratio="3/2"
            @click="showFullPic(pic)"
        />
        <q-btn class="download" style="width: 100%; background-color: #ded6d6"
               @click="downloadPrivetly(pic,key)">הורד
          תמונה
        </q-btn>
      </q-card>

    </div>
  </div>
</template>

<script>
import FsLightbox from "fslightbox-vue";
import {mapMutations} from 'vuex'

export default {
  props: ['localEvent'],
  name: "PhotoList",
  components: {FsLightbox},

  data: () => ({
    isCheckDownload: {},
    isFullScreen: {chosenPic: '', value: false},
    countPhoto: 0
  }),
  methods: {
    ...mapMutations('events', ['setCountPhoto']),
    isDownload(pic) {
      //chek how many photos has downloads
      if (pic.isDownload && !this.isCheckDownload[pic.uploadTime]) {
        this.isCheckDownload[pic.uploadTime] = true
        this.countPhoto++
        this.setCountPhoto(this.countPhoto)// set the counter of download photos
        console.log(this.isCheckDownload)
        return false
      } else {
        if (this.isCheckDownload[pic.uploadTime]) {
          return false
        }
      }
      return true
    },
    showFullPic(pic) {
      this.isFullScreen.chosenPic = pic.photoURL
      this.isFullScreen.value = !this.isFullScreen.value
    },
    downloadPrivetly(pic, key) {
      this.$emit('onDownload', {pic, key})
    }
  }
}
</script>

<style scoped>

.crop {
  width: 25%;
}
</style>