<template>
  <div class="q-pa-md">
    <q-btn color="red" @click="showLoading" label="Show Loading" />

  </div>
</template>

<script>
import {Loading} from 'quasar'

export default {
  name: "Loading",
  methods: {
    showLoading () {
      this.$q.loading.show({
        spinner: Loading,
        spinnerColor: 'yellow',
        spinnerSize: 140,
        backgroundColor: 'purple',
        message: 'Some important process is in progress. Hang on...',
        messageColor: 'black'
      })

      // hiding in 3s
      this.timer = setTimeout(() => {
        this.$q.loading.hide()
        this.timer = void 0
      }, 3000)
    }
  },
created() {
  this.$q.loading.show({
    delay: 400 // ms
  })
},
  beforeDestroy () {
    // if (this.timer !== void 0) {
    //   clearTimeout(this.timer)
    //   this.$q.loading.hide()
    // }
  }
}
</script>

<style scoped>

</style>