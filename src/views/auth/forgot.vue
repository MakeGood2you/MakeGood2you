<template>
  <div class="bg-white full-height-vh column justify-center">
    <div dir="rtl" class=" column items-center shadow-2 q-mx-auto background">
      <Logo class=""/>
      <div class="q-gutter-y-lg q-mt-lg column items-center">
        <div class=" column items-center container">
          <h5 class="q-mt-lg">שכחתי סיסמא </h5>
        </div>

        <form class="q-gutter-y-lg">
          <q-input class="inputs" v-model="email" placeholder="הזן אימייל" type="email"></q-input>
          <div class="column q-mt-xl q-gutter-y-sm">
            <q-btn color="primary" @click="handleSubmit()" class="">אשר</q-btn>
            <q-btn color="dark" @click="$router.push('/')" class="">חזור</q-btn>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseInstance from '../../middleware/firebase'
import Logo from "../../components/app/Logos/Logo";

export default {
  name: "forgot",
  components: {Logo},

  data() {
    return {
      email: '',
    }
  },
  firebase() {
    const user = firebaseInstance.firebase.auth().currentUser;
    return {
      profile: user.uid,
    }
  },
  methods: {

    handleSubmit() {
      const auth = firebaseInstance.firebase.auth();
      auth.sendPasswordResetEmail(this.email).then(() => {
        alert('מייל נשלח ברגעים אלו')
        this.$router.push(`/`)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./src/styles/media";

.body {

}
</style>
