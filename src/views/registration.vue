<template>
  <div class="body">
    <div class="background">
      <div class="ori" dir="rtl">
        <form class="q-gutter-md column">
          <div id="image2"><img alt="user" src="../assets/user.png" width="100"></div>
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
            <a style="color: #027BE3" v-close-popup @click="fixed=true"> תנאי שימוש </a>
          </div>
          <q-dialog v-model="fixed">
            <q-card>
              <q-card-section>
                <div class="text-h6" dir="rtl">תנאי שימוש</div>
              </q-card-section>

              <q-separator/>

              <q-card-section style="max-height: 50vh" class="scroll">
                <p>{{ terms }}</p>
              </q-card-section>

            </q-card>
          </q-dialog>
          <q-btn class="buttonE" label="הרשמה" @click="registerWithMailAndPass()"/>
          <q-btn class="buttonE" label="חזור" @click="goBack()"/>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "registration",
  data() {
    return {
      localUser: {
        email: '',
        password: ''
      },
      accepted: false,
      fixed: false,
      terms: '',
      isPwd: true
    }
  },
  computed: mapState('auth', ['isFixed', 'isAcceptTerms', 'user']),
  methods: {
    ...mapActions('auth', ['register', 'checkTerm']),
    ...mapMutations('auth', ['setPropertyTrueOrFalse']),
    goBack() {
      this.$router.push(`/Register`)
    },

    async registerWithMailAndPass() {
      console.log(this.accepted)
      if (this.isAcceptTerms === false) {
        alert('יש לאשר את תנאי השימוש')
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

    },
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
  border-radius: 10px;
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
