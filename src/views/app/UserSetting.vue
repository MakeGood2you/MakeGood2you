<template>
  <div class="column items-center "style="width: 80vw">
    <span class="text-h6">הגדרות כלליות</span>
    <div dir="rtl" style="width: 80%">
      <Confirm/>
      <div class="q-pa-md" style="width: 80%">
        <q-list padding bordered class="rounded-borders">
          <q-expansion-item
              dense
              dense-toggle
              expand-separator
              icon="perm_identity"
              label="שינוי ססמא"
          >
            <q-card>
              <q-card-section>
                <q-input placeholder="הזן ססמא חדשה" ref="password" id="password" v-model="password"
                         :type="isPwd ? 'password' : 'text'"
                >
                  <template v-slot:append>
                    <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                        :rules="[ val => val  && val.length > 0 || 'נו מה יהיה?']"

                    />
                  </template>
                </q-input>
                <q-btn
                    class="q-mt-md"
                    @click="setPassword"
                    label="עדכן ססמא"></q-btn>

              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item
              dense
              dense-toggle
              expand-separator
              icon="signal_wifi_off"
              label="מדיניות ותנאים"
          >
            <q-card>
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                eveniet doloribus ullam aliquid.
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item
              dense
              dense-toggle
              expand-separator
              icon="drafts"
              label="התנתקות"
              header-class="text-purple"
          >
            <q-card dir="rtl">
              <q-card-section>
                <Disengagement/>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
      <q-btn class="q-mr-lg self-start"
             @click="$router.push('/home')"
      >חזור
      </q-btn>

    </div>
  </div>
</template>

<script>
import Disengagement from "../../components/app/userSettings/Disengagement";
import {mapActions} from "vuex";
import {positive} from "../../middleware/utils/notify";
import Confirm from "../../components/app/Confirm";

export default {
  name: "UserSetting",
  components: {Confirm, Disengagement},
  data: () => ({
    isPwd: true,
    password: ''
  }),
  methods: {
    ...mapActions('auth', ['updatePassword']),
    async setPassword() {
      debugger
      if (this.password.length && this.password.length >= 6) {
        await this.updatePassword(this.password)
        this.$q.notify(positive(('הססמא שונתה בהצלחה')))
        this.password = ''
      }else {
        console.log(this.password.length)
      }
    }
  }
}
</script>

<style scoped>

</style>