<template>
  <div class="column">
    <div
        class="column items-center">
      <q-icon v-show="!localImage" class="" color="accent" size="10rem" name="svguse:icons.svg#person"/>
      <div class="animated">
        <q-img v-if="localImage" class="circle" :src="localImage"></q-img>

        <q-file
            accept="image/*"
            borderless stack-label
            class="relative"
            @input="onFileChange">

          <q-icon class="" name="add_a_photo" size="30px"/>
        </q-file>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "AddImage",
  props: ['url'],
  data: () => ({
    imageProfile: undefined,
    localImage: null,
    isFileChange:false
  }),
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('businesses', ['currentImageProfile', 'businessDetails']),
  },
  methods: {
    ...mapActions('businesses', ['uploadProfileImage']),
    ...mapActions('businesses', ['uploadProfileImage']),

    onFileChange(e) {
      const file = e
      this.imageProfile = file
      this.localImage = URL.createObjectURL(file);
      this.isFileChange = true
      this.$emit('fileChange')
    },

    async userDetails() {
      if (this.imageProfile) {
        await this.uploadProfileImage(this.imageProfile)
      }
    },

    checkIfImageExist() {
      if (this.url) {
        this.localImage = this.url
      }
    }
  },
  created() {
    this.checkIfImageExist()
  },
  watch:{
    url(){
      this.localImage = this.url
    },

  }
}
</script>

<style scoped>

.relative {
  cursor: pointer;
  position: absolute;
  width: 1.5rem;
  height: 0.5rem !important;
  left: 16rem;
  top: 9.5rem;
}


.add-photo {
  position: absolute;
}

</style>
