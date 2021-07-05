<template>
  <div class="q-pa-md">
    <FsLightbox
        :toggler="toggler"
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

    <div>
      <div class="row justify-center q-gutter-sm">
        <q-intersection
            v-for="(pic, index) of pics"
            :key="index"
            class="crop"
            once
            transition="scale"
        >
          <q-card>
            <q-img
                :src="pic.src"
                id="pic"
                :ratio="4/3"
                v-show="pic.isDownload===false"
                @click="getAlbum(pic)"
                v-lazy-load
            />
            <q-btn class="download" v-show="pic.isDownload===false" style="width: 100%; background-color: #ded6d6" @click="downloadPrivetly(pic)">הורד
              תמונה
            </q-btn>
          </q-card>
        </q-intersection>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import 'firebase/storage';
import {mapActions} from 'vuex';
import FsLightbox from "fslightbox-vue";
import InfiniteLoading from 'vue-infinite-loading'
import lazyLoad from '../directives/lazyload'

export default {
  components: {FsLightbox, InfiniteLoading},
  data() {
    return {
      pics: [],
      downloadedPics: [],
      display: true,
      firebaseStorage: [],
      guestName: '',
      photoPaths: [],
      countPhoto: '',
      eid: this.$route.params.eid,
      opened: false,
      chosenPic: '',
      toggler: false,
    }
  },

  methods: {
    ...mapActions('events', ['updatePhotosToFirebase', 'getPhotosToFirebase']),

    async downloadPrivetly(pic) {
      const eid = this.eid
      var details = {pic, eid}
      await this.updatePhotosToFirebase(details)
      await this.downloadUrl(pic.src, pic.name)
      pic.isDownload = true
    },
    getAlbum(pic) {
      this.chosenPic = pic.src
      this.toggler = !this.toggler
    },
    async downloadUrl(url, filename) {
      this.countPhoto++

      await fetch(url).then(function (t) {
        return t.blob().then((b) => {
              var a = document.createElement("a");
              a.href = URL.createObjectURL(b);
              a.setAttribute("download", filename);
              a.click();
            }
        );
      });
    },

    async download(pics) {
      for (const pic of pics) {
        const eid = this.eid
        var details = {pic, eid}
        if (pic.isDownload != true) {
          await this.downloadUrl(pic.src, pic.name)
          await this.updatePhotosToFirebase(details)
          pic.isDownload = true
        }
      }
    },

    goHome() {
      this.$router.push(`/event-page/${this.eid}`)
    },

    async createdFunction() {
      const eid = this.$route.params.eid
      const photoName = await this.getPhotosToFirebase(eid)
      const photoNameOk = {photoName}.photoName

      const ref = firebase.storage().ref(`${this.eid}/`)
      ref.list()
          .then(url => {
            const paths = url._delegate.items
            paths.forEach(path => {
              const newPhoto = {}
              newPhoto.src = path._location.path_
              newPhoto.name = path.name
              newPhoto.path = path.fullPath
              if (newPhoto.path.includes('..')) {
                return
              }
              this.firebaseStorage.push(newPhoto)
            })
            this.firebaseStorage.forEach(src => {
              firebase.storage().ref(`${src.src}`).getDownloadURL().then(url => {
                const obj = {
                  src: url,
                  name: src.name,
                  path: src.path,
                  isDownload: false
                }
                var exist = false
                for (var photoNameO in photoNameOk) {
                  const downloadPhotos = photoNameOk[photoNameO]
                  if (obj.name === downloadPhotos) {
                    exist = true
                  }
                }
                if (exist === false) {
                  this.pics.push(obj)
                }
              })
            })
            this.countPhoto = Object.keys(photoName).length
          })
          .catch(e => {
            console.log(e);
          })
    }
  },

  async created() {
    if (!window.user) {
      await this.$router.push('/')
    }
    await this.createdFunction()
  },
  directives: {
    lazyLoad
  }
}
</script>

<style scoped>

.crop {
  width: 270px;
}

#pic:hover {
  filter: opacity(70%);
}

.homePage {
  margin-top: 8px;
  margin-right: 10px;
}

.downloadPic {
  margin-top: 8px;
  margin-right: 100px;
}

.countPhoto {
  margin-top: -241px;
  margin-right: 200px;
  margin-bottom: 220px;
  color: #008e24;
}

</style>
