<template>
  <div class="body">
    <div class="background">
      <div class="ori" dir="rtl">
        <form class="q-gutter-md column">
          <TermsAndConditions :isBtn="isBtn"></TermsAndConditions>

          <div id="image2"><img alt="user" src="../../assets/user.png" width="100"></div>
          <h5 class="witchSign">הרשמה </h5>
          <q-input v-model="localUser.email" placeholder="אימייל" style="margin-top: 60px" type="email"></q-input>
          <q-input placeholder="סיסמא" ref="password" id="password" v-model="localUser.password"
                   :type="isPwd ? 'password' : 'text'"
          >
            <template v-slot:append>
              <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <br>
          <div class="self-start">
            <q-checkbox class="checkbox " @input="setPropertyTrueOrFalse('isAcceptTerms')" v-model="accepted">אני מאשר
              את
            </q-checkbox>
            <a style="color: #027BE3" v-close-popup @click="setPropertyTrueOrFalse('isFixed')"> תנאי שימוש </a>
          </div><br>

          <q-btn class="buttonE" color="primary" label="הרשמה" @click="registerWithMailAndPass()"/>
          <q-btn class="buttonE" color="dark" label="חזור" @click="goBack()"/>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import {isNotAcceptTerms} from "../../middleware/utils/notify/auth";
import TermsAndConditions from "../../components/app/TermsAndConditions";

export default {
  components:{TermsAndConditions},
  name: "registration",
  data() {
    return {
      isBtn:true,
      localUser: {
        email: '',
        password: ''
      },
      accepted: false,
      isPwd: true
    }
  },
  computed: mapState('auth', ['isFixed', 'isAcceptTerms', 'user']),
  methods: {
    ...mapActions('auth', ['register', 'checkTerm']),
    ...mapMutations('auth', ['setPropertyTrueOrFalse']),
    goBack() {
      this.$router.push(`/`)
    },

    async registerWithMailAndPass() {
      console.log(this.accepted)
      if (this.isAcceptTerms === false) {
       return this.$q.notify(isNotAcceptTerms)
        return console.error('יש לאשר את תנאי השימוש')
      }
      if (this.localUser.email && this.localUser.password) {
        await this.register(this.localUser)
        if (this.user) {
          await this.$router.push('/payment');
        }
      } else {
        alert('אחד מהפרטים לא הוזנו')
      }
    }
  }
}
</script>

<style scoped>
.buttonE {
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 10px;
  width: 90%;
  height: 50px;
  border: none;
  font-size: 20px;
  color: antiquewhite;
}

.textOk:hover {
  filter: opacity(50%);
}

.body {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
