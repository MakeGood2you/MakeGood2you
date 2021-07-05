<template>
  <div class="body">
    <div class="background">
      <div class="ori" dir="rtl">
        <form class="q-gutter-md">
          <div id="image2"><img alt="user" src="../assets/user.png" width="100"></div>
          <h5 class="witchSign" v-if="!turn">הרשמה </h5>
          <q-input v-if="!turn" v-model="email" placeholder="אימייל" style="margin-top: 60px" type="email"></q-input>
          <q-input placeholder="סיסמא" ref="password" id="password" v-model="password" :type="isPwd ? 'password' : 'text'">
            <template v-slot:append>
              <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <br>

            <a class="textOk" @click="fixed = true" style="color: #027BE3; margin-left: 70%" >תנאי שימוש</a>

            <q-dialog v-model="fixed">
              <q-card>
                <q-card-section>
                  <div class="text-h6" dir="rtl" >תנאי שימוש</div>
                </q-card-section>

                <q-separator/>

                <q-card-section style="max-height: 50vh" class="scroll">
                  <p>{{ terms }}</p>
                </q-card-section>

                <q-separator/>

                <q-card-actions align="right">
                  <q-btn flat label="אשר" color="primary" v-close-popup @click="accepted=true"/>
                </q-card-actions>
              </q-card>
            </q-dialog>
          <q-btn class="buttonE" label="הרשמה" @click="sign()"/>
          <q-btn class="buttonE" label="חזור"  @click="goBack()"/>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseInstance from "@/middleware/firebase";
import {mapActions} from "vuex";

export default {
  name: "registration",
  data() {
    return {
      accepted: false,
      fixed: false,
      email: '',
      password: '',
    }
  },
  methods: {
    ...mapActions('events', ['checkTerm', 'setTermService','checkLastDayAuth']),
    goBack(){
      this.$router.push(`/Register`)
    },
    async checkPay() {
      const checker = await this.checkLastDayAuth()
      debugger
      if (checker==true) {
        await this.$router.push('/home')
      }else {
        await this.$router.push('/payment');
      }
    },

    sign() {
      if (this.accepted === true) {
        firebaseInstance.firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then((userCredential) => {
              // Signed in
              var user = userCredential.user;
              // ...
              window.user = userCredential.user;

                 this.setTermService()
                 this.checkPay()

            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              // ..
            });
      } else {
        alert('יש לאשר את תנאי השימוש')
      }
    }
  }
}
</script>

<style scoped>
.buttonE{
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
  border-radius: 10px;
}
.textOk:hover{
  filter: opacity(50%);
}
.body{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
