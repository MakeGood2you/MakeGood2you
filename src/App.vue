<template>
  <q-layout>
    <q-page-container class="">
      <q-toolbar>
        <Setting class="absolute-top-right"></Setting>
      </q-toolbar>

      <div id="image"><img alt="picPicLogo" src="../src/assets/osher.png" width="100"></div>
    </q-page-container>
    <q-page-container>

      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import Setting from './components/app/Settings'
import {mapActions, mapMutations, mapState} from "vuex";


export default {
  data: () => ({}),
  components: {Setting},
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('businesses', ['isPay']),
  },
  methods: {
    ...mapActions('businesses',['isUserPayValidate']),
    ...mapMutations('auth',['setUser'])
  },
  created() {
    const user = JSON.parse(localStorage.getItem('user'))
    user && this.setUser(user)
    //
    // if (!this.isPay){
    // this.isUserPayValidate()
    // }
  }
}

</script>
<style lang="sass">
@import "src/styles/quasar.variables"
#image
  text-align: left;
  margin-left: 40px;
  margin-top: -30px;


body
  background-size: 100%
  /*background-image: url("https://static.toiimg.com/photo/64560386/mountain-peaks-unconquered.jpg?width=748&resize=4");*/
  /*backdrop-filter: blur(15px);*/
  background-color: $secondary






</style>

