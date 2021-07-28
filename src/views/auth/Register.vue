<template>
  <div class="bg-white full-height-vh column justify-center">
    <div dir="rtl" class="column items-center shadow-2 q-mx-auto  background">
      <Logo class=""/>
      <div class="q-mt-xl column items-center container">
        <h5 class="q-mt-lg">התחברות</h5>
      </div>

      <q-form class="column">
        <q-input v-if="!turn" v-model="localUser.email" placeholder="אימייל" class="inputs"
                 type="email"></q-input>
        <q-input placeholder="סיסמא" ref="password" class="inputs" v-model="localUser.password"
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

        <p class="forget cursor-pointer"
           @click="goToForgot">שכחתי סיסמא</p>

        <terms-and-conditions/>


        <q-btn color="primary" @click="getLogin('passAndEmail')" class="btn q-mt-md">
          התחבר
        </q-btn>

      <div class="column items-center q-my-md">
        <p>או באמצעות:</p>
        <div>
          <q-btn flat @click="getLogin('google')">
            <img src="../../assets/google.png" height="50" width="50"/>
          </q-btn>
          <q-btn flat icon="facebook" size="xl" style="display: inline; color: #0028ad; margin-right: 20px; "
                 @click="getLogin('facebook')"/>
        </div>
      </div>

      </q-form>
      <p class="q-pa-md">עדיין לא נרשמת? <b class="reg cursor-pointer" @click="registering">
        לחץ כאן
      </b></p>
    </div>
  </div>
</template>
<script>
import {mapActions, mapMutations, mapState} from 'vuex'
import {negative, positive} from "../../middleware/utils/notify";
import TermsAndConditions from "../../components/app/TermsAndConditions";
import Logo from "../../components/app/Logos/Logo";

const window = {
  recaptchaVerifier: undefined
}
let verify = window.recaptchaVerifier;
let signUp = [];

export default {

  name: "Register",
  components: {Logo, TermsAndConditions},
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
    }
  },
  computed: {
    ...mapState('auth', ['isFixed', 'user','isAcceptTerms','isUserExist']),
    ...mapState('businesses', ['isPay']),
    ...mapState('app', ['error'])
  },
  methods: {
    ...mapActions('auth', ['checkTerm', 'login', 'setTermService']),
    ...mapMutations('auth', ['setUser', 'setIsUserExist']),

    async getLogin(provider) {
      provider = provider !== 'passAndEmail' ? provider : this.localUser
      const result = await this.login(provider)

      if (typeof result === 'string') { // if string is error
        return this.$q.notify(negative(result))
      }
      console.log(this.isAcceptTerms, 'this.isAcceptTerms')
      if (!this.isAcceptTerms) {
        return this.$q.notify(negative('יש לאשר תנאי שימוש'))
      }
      this.$q.notify(positive('התחברת בהצלחה :)'))
      this.choseRouter()
    },
    choseRouter() {
      if (this.isPay) { // already checked in auth actions login
        this.$router.push('/home')
      } else {
        this.$router.push('/payment');
      }
      this.setIsUserExist(true)
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

    }
  }
}


</script>

<style lang="scss" scoped>

@import "./src/styles/media";
@import "src/styles/quasar.variables";


.reg:hover {
  filter: opacity(55%);
}

.connectMe:hover {
  filter: opacity(55%);
}

.forget:hover {
  filter: opacity(55%);
}
</style>

