<template>
  <q-btn
      v-if="!isPay"
      class="q-mr-sm q-pa-sm q-pr-md"
      :icon=" 'logout'"
      color="black"
      flat
      dense
      @click="signOut"
      :label="'התנתק'"/>
  <q-btn
      v-else
      class="q-mr-sm q-pa-sm q-pr-md"
      :icon="isPay ?'account_circle' : 'logout'"
      no-caps
      color="black"
      flat
      dense
      :label="'חשבון'">

    <q-menu>
      <div class="row no-wrap items-center q-pa-lg setting-container">
        <div class="row no-wrap">
          <div dir="rtl" class="column">

            <div class="row btn q-gutter-x-sm no-wrap cursor-pointer"
                 @click="goLeads"
            >
              <div class=" ">
                <q-icon size="1.3rem" name="people"></q-icon>
              </div>

              <div
                  class=""
                  v-model="mobileData"
              >
                <span class="justify-end"> לידים  </span>
              </div>
            </div>

            <q-separator />

            <div class="row btn q-gutter-x-sm no-wrap cursor-pointer"
                 @click="goEditBusinessDetails"
            >
              <div class=" self-center">
                <q-icon size="1.3rem" name="edit"></q-icon>
              </div>
              <div
                  class=""
                  v-model="mobileData">
                <div class="">
                  <div class="">
                    <span> פרטי העסק </span>
                  </div>
                </div>
              </div>

            </div>
            <q-separator />


            <div class="row btn q-gutter-x-sm no-wrap cursor-pointer"
                 @click="$router.push('/help')"
            >
              <div class="self-center">
                <q-icon color="black" size="1.3rem" name="svguse:icons.svg#help"/>
              </div>
              <div
                  class="btn"
                  v-model="mobileData">
                <div class="">
                  <div class="">
                    <span>תמיכה\עזרה </span>
                  </div>
                </div>
              </div>
            </div>

            <q-separator />

            <div class="row btn q-gutter-x-sm no-wrap cursor-pointer"
                 @click="$router.push('/settings')"
            >
              <div>
                <q-icon size="1.3rem" name="settings"></q-icon>

              </div>
              <div
                  class="btn"
                  v-model="mobileData">
                <div class="">
                  <span class="q-my-sm"> הגדרות </span>
                </div>
              </div>
            </div>

              <q-separator  class=" q-my-sm"  color="red" />

<!--              <hr class="q-mb-md" color="red">-->

            <div class="text-center">
              <span
                  class="text-bold cursor-pointer"
                  @click="signOut"
                  v-close-popup

              > התנתק</span>
            </div>
          </div>
        </div>
        <q-separator vertical inset class="q-mx-lg line "/>

        <div class="img-container column items-center">
          <div class="q-mt-md column">
            <q-avatar class="content-start" size="8rem">
              <q-icon v-if="!businessDetails.photoURL" color="accent" size="8rem" name="svguse:icons.svg#person"/>
              <q-img sizes="" v-else
                     :src="businessDetails.thumbURL ?businessDetails.thumbURL: businessDetails.photoURL"/>
            </q-avatar>
            <div dir="rtl" class="text-h6 text-center text-bold q-pt-xl "> היי,
              {{ businessDetails ? businessDetails.BName : 'חבוב' }}
            </div>
          </div>
        </div>
      </div>
      </q-menu>
    </q-btn>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'
import {getUserFromLocalStorage} from '../../middleware/utils/index'

export default {
  name: "Settings",
  data() {
    return {
      mobileData: true,
      bluetooth: false,
      informationHome: null,
    }
  },
  computed: {

    ...mapState('auth', ['user','']),
    ...mapState('businesses', ['businessDetails', 'isPay']),
  },
  methods: {
    ...mapActions('auth', ['firebaseLogout']),
    ...mapMutations('auth', ['setIsUserExist']),
    ...mapActions('leads', ['getLeads']),
    ...mapActions('businesses', ['billingRecurringCancelAction', 'getBusinessDetails']),
    ...mapMutations('businesses', ['addDetails']),
    goEditBusinessDetails() {
      this.$router.push('/add-business-details')
    },

    async signOut() {
      await this.firebaseLogout()
      await this.$router.push(`/`)
      this.setIsUserExist(false)
    },

    async goLeads() {
        await this.$router.push('/leads')
    }
  },
  async created() {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user || this.user) {
      await this.getBusinessDetails()
    }

  }

}
</script>

<style scoped>
.img-container {
  width: 50%
}

.setting-container {
  width: 20rem !important;
}


</style>
