<template>
  <div class="bg-white full-height-vh column items-center justify-center">

    <div dir="rtl" class="column items-center shadow-2   background">
      <Logo class=""/>
      <div class="q-gutter-y-lg q-mt-lg column items-center">
        <div class=" column items-center container">
          <h5 class="q-mt-lg">הרשמה </h5>
        </div>
        <q-form class="column items-stretch q-gutter-y-sm">
          <TermsAndConditions :isBtn="isBtn"></TermsAndConditions>

          <q-input v-model="localUser.email" placeholder="אימייל" class="inputs" type="email"></q-input>
          <q-input placeholder="סיסמא" ref="password" id="password" v-model="localUser.password" class="inputs"
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
            <q-checkbox class="checkbox " @input="setPropertyTrueOrFalse('isAcceptTerms')" v-model="isAcceptTerms">אני מאשר
              את
            </q-checkbox>
            <a style="color: #027BE3" v-close-popup @click="setPropertyTrueOrFalse('isFixed')"> תנאי שימוש </a>
          </div>
          <div class="column  q-gutter-y-sm">
            <q-btn class="buttonE" color="primary" label="הרשמה" @click="registerWithMailAndPass()"/>
            <q-btn class="buttonE" color="dark" label="חזור" @click="goBack()"/>
          </div>
        </q-form>
      </div>
    </div>
  </div>

</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import {isNotAcceptTerms} from "../../middleware/utils/notify/auth";
import TermsAndConditions from "../../components/app/TermsAndConditions";
import Logo from "../../components/app/Logos/Logo";

export default {
  components: {TermsAndConditions, Logo},
  name: "registration",
  data() {
    return {
      isBtn: true,
      localUser: {
        email: '',
        password: ''
      },
      isAcceptTerms: false,
      isPwd: true
    }
  },
  computed: mapState('auth', ['isFixed', 'user']),
  methods: {
    ...mapActions('auth', ['register', 'checkTerm']),
    ...mapMutations('auth', ['setPropertyTrueOrFalse']),
    goBack() {
      this.$router.push(`/`)
    },

    async registerWithMailAndPass() {
      console.log(this.isAcceptTerms)
      debugger
      if (this.isAcceptTerms === false) {
        return this.$q.notify(isNotAcceptTerms)
        return console.error('יש לאשר את תנאי השימוש')
      }
      if (this.localUser.email && this.localUser.password) {
       const result = await this.register({user:this.localUser, isAcceptTerms:this.isAcceptTerms})
        console.log(result)
        if (typeof result === "string") return this.$q.notify(result)
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

<style lang="scss" scoped>
@import "./src/styles/media";
</style>
