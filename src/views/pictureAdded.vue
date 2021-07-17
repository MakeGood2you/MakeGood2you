<template>
  <div class="q-pa-md">
    <FsLightbox
        :toggler="isFullScreen"
        :sources="[chosenPic]"
    />
    <q-btn
        class="absolute-top-right homePage"
        @click="goHome"
        icon="home"
        color="black"
        flat
        dense
        label="דף הבית"
    />
    <p class="countPhoto" dir="rtl">סה"כ הורדות: <b>{{ countPhoto }}</b></p>

    <q-btn
        class="absolute-top-right downloadPic"
        @click="download(pics)"
        icon="file_download"
        color="black"
        flat
        dense
        label="הורד תמונות"
    />

    <div class="row justify-center q-gutter-sm">
      <div
          v-for="(pic, index) of localPics"
          v-show="!pic.isDownload"
          :key="index"
          class="crop"
      >
        <q-card>
          <q-img
              :src="pic.url"
              id="pic"
              :ratio="4/3"
              @click="showFullPic(pic)"
          />
          <q-btn class="download" v-show="pic.isDownload===false" style="width: 100%; background-color: #ded6d6"
                 @click="downloadPrivetly(pic)">הורד
            תמונה
          </q-btn>
        </q-card>

      </div>
    </div>
    <div v-intersection="onIntersection"></div>
  </div>
</template>

<script>
import firebase from "firebase";
import 'firebase/storage';
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex';
import FsLightbox from "fslightbox-vue";
import InfiniteLoading from 'vue-infinite-loading'
import lazyLoad from '../directives/lazyload'

export default {
  components: {FsLightbox, InfiniteLoading},
  data() {
    return {

      start: 0,
      end: 10,
      limit: 10,
      countPhoto: '',
      eid: this.$route.params.eid,
      chosenPic: '',
      isFullScreen: false,
      options: {
        handler: this.onIntersection,
      }
    }
  },
  computed: {
    ...mapGetters('events', {pics: 'getPhotos'}),
    ...mapState('events', ['localPics']),
    pics() {
      return this.$store.getters["events/getPhotos"](this.eid)
    }
  },
  methods: {
    ...mapActions('events', ['updatePhotosToFirebase', 'getPhotosToFirebase', 'getLimitCounter']),
    ...mapMutations('events', ['setLocalImages']),
    test(val) {
      console.log('lalalal')
      console.log(val)
    },
    async downloadPrivetly(pic) {
      const eid = this.eid
      var options = {pic, eid}
      await this.updatePhotosToFirebase(options)

      await this.downloadUrl(pic.url, pic.name)
      pic.isDownload = true
    },

    showFullPic(pic) {
      this.chosenPic = pic.url
      this.isFullScreen = !this.isFullScreen
    },

    async downloadUrl(url, filename) {
      this.countPhoto++
      const self = this
      await fetch(url).then(function (t) {
        return t.blob().then((b) => {
              var a = document.createElement("a");
              a.href = URL.createObjectURL(b);
              a.setAttribute("download", self.countPhoto);
              a.click();
            }
        );
      });
    },

    async download(pics) {
      this.countPhoto++
      for (const pic of pics) {
        const options = {pic, eid: this.eid}

        if (pic.isDownload !== true) {
          await this.downloadUrl(pic.url, this.countPhoto++)
          await this.updatePhotosToFirebase(options)
          pic.isDownload = true
        }
      }
    },

    goHome() {
      this.$router.push(`/event-page/${this.eid}`)
    },
    onIntersection(entry) {
      if (this.localPics.length && entry.isIntersecting) {
        const counter = 10
        const length = this.pics.length
        if (this.localPics.length <= (length - counter)) {
          debugger
          const setPics = this.pics.slice((this.start + counter), (this.end + counter))
          this.setLocalImages(setPics)
          // this.localPics = this.localPics.concat(setPics)
        } else {
          const setPics = this.pics.slice((this.localPics.length), (this.pics.length))
          this.setLocalImages(setPics)
          // this.localPics = this.localPics.concat(setPics)
        }
        console.log(entry)
        console.log(entry.isIntersecting)
      }
    }
  },
  async created() {
    await this.getLimitCounter({eid: this.eid, uid: window.user.uid})
    const setPics = this.pics.slice(this.start, this.end)
    this.setLocalImages(setPics)

    console.log(this.localPics )
  },
  watch:{
    localPics(){
      console.log(this.localPics,'lalala')
      console.log(this.localPics.length)
  debugger
    }
  }
}
</script>

<style scoped>

.crop {
  width: 400px;
}

#pic:hover {
  filter: opacity(70%);
}

.homePage {
  margin-top: 9px;
  margin-right: 80px;
}

.downloadPic {
  margin-top: 9px;
  margin-right: 180px;
}

.countPhoto {
  margin-top: -241px;
  margin-right: 280px;
  margin-bottom: 220px;
  color: #008e24;
}

</style>
