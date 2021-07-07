<template>
  <q-layout>
    <q-toolbar>
      <Setting  v-show="user" class="absolute-right q-pr-sm"></Setting>
    </q-toolbar>

    <div id="image"><img alt="picPicLogo"   src="../src/assets/osher.png" width="160"></div>

    <q-page-container>

      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import Setting from './components/app/Settings'
import {mapState} from "vuex";


export default {
  data: () => ({}),
  components: {Setting},
  computed: mapState('auth', ['user']),

}

</script>

<style>
#image {
  text-align: left;
  margin-left: 40px;
  margin-top: -30px;
}

body {
  background-size: 100%;
  /*background-image: url("https://static.toiimg.com/photo/64560386/mountain-peaks-unconquered.jpg?width=748&resize=4");*/
  /*backdrop-filter: blur(15px);*/
  background-color: #d9d2cd;
}

</style>

