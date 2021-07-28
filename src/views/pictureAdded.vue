<template>
  <div class="q-pa-md">
        <h1 class="text-center text-opacity" v-if=" !localEvent.photos ">
           אין תמונות לאירוע זה {{ localEvent.photos }}
        </h1>

    <div class="row no-wrap absolute-top-right q-mr-xxl ">
      <p class="countPhoto self-center">סה"כ הורדות: <b>{{ countPhoto }}</b></p>
<!--      <q-btn-->
<!--          class="q-pa-sm self-center"-->
<!--          @click="goHome"-->
<!--          icon="home"-->
<!--          color="black"-->
<!--          flat-->
<!--          dense-->
<!--          label="דף הבית"-->
<!--      />-->

      <q-btn
          class=" q-pa-sm self-center"
          @click="download(localEvent)"
          icon="file_download"
          color="black"
          flat
          dense
          label="הורד תמונות"
      />
    </div>
    <q-btn
        @click="isShowDownload= !isShowDownload">
      {{isShowDownload ? ' תמונות שירדו' : ' תמונות שלא ירדו'}}
    </q-btn>
    <PhotoList v-if="!isShowDownload" @onDownload="downloadPrivetly" :localEvent="localEvent"/>
    <PhotoList v-else @onDownload="downloadPrivetly" :localEvent="localEvent" :isShowDownload="isShowDownload"/>
    <!--    <div v-intersection="onIntersection"></div>-->
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex';
import InfiniteLoading from 'vue-infinite-loading'
import PhotoList from "../components/photos/PhotoList";

export default {
  components: {PhotoList, InfiniteLoading},
  data() {
    return {
      isShowDownload: false,
      localEvent: {
        photos: {}
      },
      start: 0,
      end: 10,
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
    ...mapState('events', ['localPics', 'event', 'photos','countPhoto']),
    pics() {
      return this.$store.getters["events/getPhotos"](this.eid)
    }
  },
  methods: {
    ...mapActions('events', ['updatePhotosToFirebase', 'getLimitCounter', 'getEventById']),
    ...mapMutations('events', ['setLocalImages', 'setEvent']),


    async downloadPrivetly(picParams) {
      const eid = this.eid
      const key = picParams.key
      const pic = picParams.pic
      var options = {pic: pic.photoURL, eid, key}
      await this.updatePhotosToFirebase(options)
      await this.downloadUrl(pic.photoURL, key)
    },



    async downloadUrl(url) {
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
        console.log(entry.isIntersecting)
      }
    },
    async isEventExist() {
      if (!this.event) {
        await this.getEventById(this.eid)
      }
      // Object.assign(this.localEvent, this.event)
      this.localEvent = {...this.event}

    }

  },
  async created() {
    await this.isEventExist()
    // await this.getLimitCounter({eid: this.eid, uid: window.user.uid})
    // const setPics = this.pics.slice(this.start, this.end)
    // this.setLocalImages(setPics)
  },
}
</script>

<style scoped>


#pic:hover {
  filter: opacity(70%);
}

/*.downloadPic {*/
/*  margin-right: 180px;*/
/*}*/

.countPhoto {
  color: #008e24;
}

</style>
