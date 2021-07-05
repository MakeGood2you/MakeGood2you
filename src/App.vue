<template>
  <q-layout>
    <q-toolbar>
      <q-btn
          v-show="user.uid"
          class="absolute-right q-pr-sm"
          @click="signOut"
          icon="account_circle"
          no-caps
          color="black"
          flat
          dense
          label="התנתק"
      />
    </q-toolbar>

    <div id="image"><img alt="picPicLogo"   src="../src/assets/osher.png" width="160"></div>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import firebaseInstance from '../../osher-project/src/middleware/firebase'


export default {
  computed:mapState('auth', ['user']),
  methods: {
    ...mapMutations('auth', ['setUser']),
    signOut() {
      const self = this
      firebaseInstance.firebase.auth().signOut().then(() => {
        // Sign-out successful.
        self.setUser(null)
      }).catch((error) => {
        // An error happened.
      });
      this.$router.push(`/`)
    }
  }
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

