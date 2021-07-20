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
        @click="download(event.photos)"
        icon="file_download"
        color="black"
        flat
        dense
        label="הורד תמונות"
    />

    <div class="row justify-center q-gutter-sm"
         v-if="event"
    >
      <div
          v-for="(pic, key) in event.photos"
          :key="key"
          v-if="pic.isDownload && isDownload(pic)"
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
    <div v-intersection="onIntersection"></div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex';
import FsLightbox from "fslightbox-vue";
import InfiniteLoading from 'vue-infinite-loading'

export default {
  components: {FsLightbox, InfiniteLoading},
  data() {
    return {
      start: 0,
      end: 10,
      countPhoto: 0,
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
    ...mapState('events', ['localPics', 'event']),
    pics() {
      return this.$store.getters["events/getPhotos"](this.eid)
    }
  },
  methods: {
    ...mapActions('events', ['updatePhotosToFirebase', 'getLimitCounter', 'getEventById']),
    ...mapMutations('events', ['setLocalImages', 'setEvent']),
    isDownload(pic) {
      if (this.event.picCounter >= this.countPhoto && pic.isDownload) {
        this.countPhoto++
      }
      return true
    },

    async downloadPrivetly(pic, key) {
      const eid = this.eid
      var options = {pic: pic.photoURL, eid, key}
      await this.updatePhotosToFirebase(options)
      await this.downloadUrl(pic.photoURL, key)
    },

    showFullPic(pic) {
      this.chosenPic = pic.photoURL
      this.isFullScreen = !this.isFullScreen
    },

    async downloadUrl(url) {
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
      for (const pic in pics) {
        const options = {pics: pics[pic], eid: this.eid}

        if (pics[pic].isDownload !== true) {
          pics[pic].isDownload = false
          await this.downloadUrl(pics[pic].photoURL)
        }
      }
      await this.updatePhotosToFirebase(options)
    },

    goHome() {
      this.$router.push(`/event-page/${this.eid}`)
    },
    onIntersection(entry) {
      if (entry.isIntersecting) {
        const counter = 10
        const length = this.pics.length
        if (this.localPics.length <= (length - counter)) {
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
    },

  },
  async created() {
    if (!this.event) {
      await this.getEventById(this.eid)
    }
    // await this.getLimitCounter({eid: this.eid, uid: window.user.uid})
    // const setPics = this.pics.slice(this.start, this.end)
    // this.setLocalImages(setPics)
  },
}
</script>

<style scoped>

.crop {
  width: 25%;
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
