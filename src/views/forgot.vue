<template>
  <form class="body">
    <div class="background">
      <div class="ori" dir="rtl">
        <form class="q-gutter-md">
          <div id="image2"><img alt="user" src="../assets/user.png" width="100"></div>
          <h5 class="witchSign">שכחתי סיסמא </h5>
          <q-input class="form-control" v-model="email" label="אימייל" style="margin-top: 60px" type="email"></q-input>
          <br>
          <q-btn @click="handleSubmit()" class="buttonE">אשר</q-btn>
        </form>
      </div>
    </div>
  </form>
</template>

<script>
import firebaseInstance from '../middleware/firebase'

export default {
  name: "forgot",
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

<style scoped>
.buttonE {
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 10px;
  width: 90%;
  height: 50px;
  border: none;
  font-size: 20px;
  background-color: #000023;
  color: antiquewhite;
  border: none;
}

.body {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
