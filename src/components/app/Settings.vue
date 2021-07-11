<template>
    <q-btn v-show="user"
           class="absolute-right q-pr-sm"
           icon="settings"
           no-caps
           color="black"
           flat
           dense
           label="חשבון">
      <q-menu class="">

        <div class="row no-wrap q-pa-md">
          <div class="column">
            <div dir="rtl" class="text-h6 q-mb-md "> היי, {{businessDetails.BName}}</div>
            <div class="self-end column">


              <q-btn
                  class="self-end"
                  @click="goLeads"
                   no-caps
                   color="black"
                   flat
                   dense
                   v-model="mobileData">
              <span>לידים</span><q-icon name="people"></q-icon>
            </q-btn>
              <q-btn
                  @click="goEditBusinessDetails"
                  class="self-end"
                  no-caps
                  color="black"
                  flat
                  dense
                  v-model="mobileData">
                <span> פרטי העסק</span><q-icon name="edit"></q-icon>
              </q-btn>


              <q-btn
                  class="self-end"
                  no-caps
                  color="black"
                  @click="$router.push('/help')"
                  flat
                  dense
                  v-model="mobileData">
                <span>תמיכה\עזרה  </span>
                <q-icon color="black" size="1.5rem" name="svguse:icons.svg#help"/>

                <!--                <q-icon name="mdi-account-question"></q-icon>-->
              </q-btn>
              <q-btn
                  class="self-end"
                  @click=""
                  no-caps
                  color="black"
                  flat
                  dense
                  @click="$router.push('/settings')"
                  v-model="mobileData">
                <span>הגדרות משתמש</span><q-icon name="account_circle"></q-icon>
              </q-btn>

            </div>
          </div>
          <q-separator vertical inset class="q-mx-lg"/>

          <div class="column items-center">
            <div class="q-mt-xl">
            <q-avatar size="72px">
              <img :src="businessDetails.photoURL">
            </q-avatar>

            <div class="text-subtitle1 q-mt-md q-mb-xs">{{ businessDetails.BName }}</div>

            <q-btn
                color="primary"
                label="התנתק"
                push
                size="sm"
                @click="signOut"
                v-close-popup
            />
            </div>
          </div>
        </div>
      </q-menu>
    </q-btn>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: "Settings",
  data() {
    return {
      mobileData: true,
      bluetooth: false,
      informationHome:null
    }

  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('businesses', ['businessDetails']),
  },
  methods: {
    ...mapActions('auth', ['firebaseLogout']),
    ...mapActions('events', ['getLeads']),
    ...mapActions('businesses', ['billingRecurringCancelAction', 'getBusinessDetails']),
    goEditBusinessDetails() {
      this.$router.push('/add-business-details')
    },

    async signOut() {
      await this.firebaseLogout()
      await this.$router.push(`/`)
    },

    async goLeads() {
      this.informationHome = await this.getLeads()
      console.log(this.informationHome)
      if (this.informationHome === null) {
        alert('אין לידים להציג')
      } else {
        await this.$router.push('leads')
      }
    }
  },
  created() {
    this.getBusinessDetails()
  }

}
</script>

<style scoped>

</style>