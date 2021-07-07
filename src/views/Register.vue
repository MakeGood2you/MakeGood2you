<template>
  <div class="body">
    <div class="background">
      <div class="ori" dir="rtl">
        <form class="q-gutter-md">
          <div id="image2"><img alt="user" src="../assets/user.png" width="100"></div>
          <h5 class="witchSign">התחברות</h5>
          <q-input v-if="!turn" v-model="localUser.email" placeholder="אימייל" style="margin-top: 60px"
                   type="email"></q-input>
          <q-input placeholder="סיסמא" ref="password" id="password" v-model="localUser.password"
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

            <q-dialog v-model="isFixed">
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
          <button @click="getLogin('passAndEmail')" class="connectMe" style="margin: auto; display:grid;">
            <span></span>
            התחבר
          </button>

          <p style="text-align: center; margin-top: 20px; font-size: 17px">או באמצעות:</p>
          <div>
            <q-btn flat style="margin-left: 20px;" @click="getLogin('google')">
              <img src="../assets/google.png" height="50" width="50"/>
            </q-btn>
            <q-btn flat icon="facebook" size="xl" style="display: inline; color: #0028ad; margin-right: 20px; "
                   @click="getLogin('facebook')"/>
          </div>

        </form>
        <br>
      </div>
      <p style="text-align: center; font-size: 15px">עדיין לא נרשמת? <b class="reg" @click="registering">
        לחץ כאן
      </b></p>
    </div>
  </div>
</template>
<script>
import {mapActions, mapMutations, mapState} from 'vuex'

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
      localUser: {
        email: '',
        password: ''
      },

      isPwd: true,
      accepted: false,
      fixed: false,
      value: true,
      code: false,
      phoneAuth: false,
      turn: false,

      name: null,
      lastName: null,
      phone: null,
      date: null,
      accept: false,
      terms: ''
    }
  },
  computed: {
    ...mapState('auth', ['isPay', 'isFixed'])
  },
  methods: {
    ...mapActions('auth', ['checkTerm', 'login', 'setTermService', 'isUserPayValidate']),
    ...mapMutations('auth', ['setUser']),
    ...mapActions('events', ['checkLastDayAuth']),
    async getLogin(provider) {
      provider = provider !== 'passAndEmail' ? provider : this.localUser
      await this.login(provider)
      this.choseRouter()

    },

    async confirmed() {
      await this.setTermService()
      //check if user pay
      await this.isUserPayValidate()
      this.choseRouter()
    },

    choseRouter() {
      if (!this.localUser) return
      this.isPay ? this.$router.push('/Home') : this.$router.push('/payment');
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
  },

  async created() {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      this.setUser(user)
      // const isUserPay = await this.isUserPayValidate(user.uid)
    }
  }
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

