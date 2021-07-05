<template>
  <div class="body">
    <div class="background">
      <div class="ori" dir="rtl">
        <form class="q-gutter-md">
          <div id="image2"><img alt="user" src="../assets/user.png" width="100"></div>
          <h5 class="witchSign">התחברות</h5>
          <q-input v-if="!turn" v-model="email" placeholder="אימייל" style="margin-top: 60px" type="email"></q-input>
          <q-input placeholder="סיסמא" ref="password" id="password" v-model="password"
                   :type="isPwd ? 'password' : 'text'">
            <template v-slot:append>
              <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <br>

          <div><br>
            <p class="forget" @click="goToForgot">שכחתי סיסמא</p>

            <q-dialog v-model="fixed">
              <q-card>
                <q-card-section>
                  <div class="text-h6" dir="rtl">תנאי שימוש</div>
                </q-card-section>
                <q-separator/>

                <q-card-section style="max-height: 50vh" class="scroll">
                  <p>{{ terms }}</p>
                </q-card-section>

                <q-separator/>

                <q-card-actions align="right">
                  <q-btn flat label="אשר" color="primary" v-close-popup @click="confirmed()"/>
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
          <br><br>
          <button @click="signIn()" class="connectMe" style="margin: auto; display:grid;">
            <span></span>
            התחבר
          </button>

          <p style="text-align: center; margin-top: 20px; font-size: 17px">או באמצעות:</p>
          <div>
            <q-btn flat style="margin-left: 20px;" @click="login()">
              <img src="../assets/google.png" height="50" width="50"/>
            </q-btn>
            <q-btn flat icon="facebook" size="xl" style="display: inline; color: #0028ad; margin-right: 20px; "
                   @click="FacebookLogin()"/>
          </div>

        </form>
        <br>
      </div>
      <p style="text-align: center; font-size: 15px">עדיין לא נרשמת? <b class="reg" @click="registering">לחץ
        כאן</b></p>
    </div>
  </div>
</template>

<script>
import firebaseInstance from '../middleware/firebase'
import {mapActions} from 'vuex'

require('dotenv').config();

const window = {
  recaptchaVerifier: undefined
}
let verify = window.recaptchaVerifier;
let signUp = [];

export default {

  name: "Register",
  data() {
    return {
      isPwd: true,
      accepted: false,
      fixed: false,
      value: true,
      code: false,
      phoneAuth: false,
      turn: false,
      email: '',
      password: '',
      name: null,
      lastName: null,
      phone: null,
      date: null,
      accept: false,
      terms: ''
    }
  },

  methods: {
    ...mapActions('events', ['checkTerm', 'setTermService', 'checkLastDayAuth']),
    async confirmed() {
      await this.setTermService().then(async () => {
        await this.checkPay()
      })
    },
    async checkPay() {
      debugger
      const checker = await this.checkLastDayAuth()
      debugger
      if (checker == true) {
        await this.$router.push('/home')
      } else {
        await this.$router.push('/payment');
      }
    },

    login() {
      const provider = new firebaseInstance.firebase.auth.GoogleAuthProvider();
      return firebaseInstance.firebase.auth()
          .signInWithPopup(provider)
          .then((result) => {
            debugger
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
            window.user = result.user;

            this.checkTerm(user.uid).then(async (res) => {
              debugger
              if (res) {
                debugger
                await this.checkPay()
              } else {
                this.fixed = true
              }
            })
          })
          .catch((error) => {
            console.log(error);
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    },

    async FacebookLogin() {
      const provider = await new firebaseInstance.firebase.auth.FacebookAuthProvider();
      await firebaseInstance.firebase.auth()
          .signInWithPopup(provider)
          .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
            window.user = result.user;

          }).then(async () => {
            var fix = await this.checkTerm()
            console.log(fix)
            if (fix === "true") {
              await this.checkPay()
            } else {
              this.fixed = true
            }
          }).catch((error) => {
            console.log(error);
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    },

    async signIn() {
      await firebaseInstance.firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
            window.user = userCredential.user;

            //if user alredy payed so go home. if not, go pay
            this.checkPay()

          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
          });

    },
    goToForgot() {
      this.$router.push('/forgot')
    },
    registering() {
      this.$router.push('/registration')
    },
    invitedEnter() {
      this.turn = true
    },

    invitorEnter() {
      this.turn = false
    },

    created() {
      if (window.user) {
        this.$router.push('/payment')
      }
    }
  }
  ,
}


</script>

<style>


.forget {
  margin-top: -40px;
  margin-bottom: -20px;
  display: flex;
}

.ori {
  text-align: center;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
}

.connectMe {
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-bottom: 50px;
  width: 90%;
  height: 50px;
  border: none;
  font-size: 20px;
  background-color: #000023;
  color: antiquewhite;
  border-radius: 10px;
}

.connectMe:hover {
  filter: opacity(55%);
}

.body {
  display: flex;
  align-items: center;
  justify-content: center;
}


.background {
  width: 400px;
  position: relative;
  background-color: rgba(255, 255, 255, 0.62);
  padding-bottom: 30px;
  color: #000023;
  border-radius: 10px;
}

#image2 {
  margin-top: -66px;
  text-align: center;
  align-items: center;

}

.registering {
  margin-bottom: -20px;
}

.reg:hover {
  filter: opacity(55%);
}

.forget:hover {
  filter: opacity(55%);
}
</style>

