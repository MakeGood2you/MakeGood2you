<template>
  <q-layout>
    <q-toolbar>
      <q-btn
          v-show="user"
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
import {mapState,mapActions} from 'vuex'
import firebaseInstance from '../../osher-project/src/middleware/firebase'


export default {
  computed:mapState('auth', ['user']),
  methods: {
    ...mapActions('auth', ['setUser']),
    signOut() {
      const self = this
      return firebaseInstance.firebase.auth().signOut().then(async () => {
        // Sign-out successful.
       await self.setUser(null)
       await this.$router.push(`/`)

      }).catch((error) => {
        // An error happened.
      });
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

