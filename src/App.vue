<template>
  <q-layout>
    <div v-if="isUserExist" dir="rtl" class="row justify-between">
      <Setting class="self-start"></Setting>
      <SimpleLogo class="mouse-over" @click="goHome()"/>

    </div>
    <q-page-container class="full-width full-height">
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import Setting from './components/app/Settings'
import {mapActions, mapMutations, mapState} from "vuex";
import SimpleLogo from './components/app/Logos/SimpleLogo'


export default {
  data: () => ({}),
  components: {Setting, SimpleLogo},
  computed: {
    isUserExist() {
      return JSON.parse(localStorage.getItem('user'))
    },
    ...mapState('auth', ['user', 'isUserExist']),
    ...mapState('businesses', ['isPay']),
  },
  methods: {
    ...mapActions('businesses', ['isUserPayValidate']),
    ...mapMutations('auth', ['setUser', 'setIsUserExist']),
    goHome() {
      this.$router.push('/home')
    }
  },
  created() {
    const user = JSON.parse(localStorage.getItem('user'))
    user && this.setUser(user)
    if (!this.isUserExist) {
      if (user) {
        this.setIsUserExist(true)
      }
    }
    //
    // this.isUserPayValidate()
  },
  watch: {
    isUserExist() {
    }
  }
}

</script>
<style lang="sass">
@import "src/styles/quasar.variables"
#image
  text-align: left
  margin-left: 40px
  margin-top: -30px

#image:hover
  filter: opacity(80%)
body
  background-size: 100%
  /*background-image: url("https://static.toiimg.com/photo/64560386/mountain-peaks-unconquered.jpg?width=748&resize=4");*/
  /*backdrop-filter: blur(15px);*/
  background-color: $secondary






</style>

