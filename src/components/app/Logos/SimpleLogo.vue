<template>
  <div @click="goHome" class="">
  <img class="logo" alt="picPicLogo" src="../../../assets/logo2.png"
       width="200">
  </div>
</template>

<script>
export default {
  name: "simple",
  methods:{
    goHome() {
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>

</style>