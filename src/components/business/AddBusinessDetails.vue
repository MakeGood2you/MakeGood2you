<template>
  <div class="q-mb-xl">
    <div class=" column items-center">
      <h4> פרטי העסק </h4>
      <p> (יפורסם אצל המשתמשים) </p>
    </div>
    <div class="radius-3 q-pa-xl shadow-4 column center max-width-1 " dir="rtl">
      <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
      >
        <p>הזן פרטי עסק:</p>
        <q-input
            v-model="localInfoDetails.BName" placeholder="שם העסק" type="text"
            filled
            :rules="[ val => val && val.length > 0 || 'חביבי שחכת להזין את שם העסק']"
        >
          <template v-slot:prepend>
            <q-icon
                class="cursor-pointer"
                name="storefront"
            />
          </template>
          <template v-slot:append>
            <q-icon
                v-if="localInfoDetails.BName !== ''"
                class="cursor-pointer"
                name="clear"
                @click.stop="localInfoDetails.BName = ''"
            />
          </template>
        </q-input>

        <q-input
            v-model="localInfoDetails.BEmail" placeholder="אימייל" type="email"
            filled
            :rules="[ val => val && val.length > 0 || 'חביבי שחכת להזין אימייל']"
        >
          <template v-slot:append>
            <q-icon
                v-if="localInfoDetails.BEmail !== ''"
                class="cursor-pointer"
                name="clear"
                @click.stop="localInfoDetails.BEmail = ''"
            />
          </template>
          <template v-slot:prepend>
            <q-icon
                class="cursor-pointer"
                name="email"
            />
          </template>
        </q-input>
        <q-input
            v-model="localInfoDetails.BPhone" placeholder="טלפון" mask="###-###-####" filled
            :rules="[val => val.length > 0  || 'חביבי מה עם הפלאפון']"
        >
          <template v-slot:append>
            <q-icon
                v-if="localInfoDetails.BPhone !== ''"
                class="cursor-pointer"
                name="clear"
                @click.stop="localInfoDetails.BPhone = ''"
            />
          </template>
          <template v-slot:prepend>
            <q-icon
                class="cursor-pointer"
                name="cellphone"
            />
          </template>
        </q-input>
        <div class="items-center">
        <q-file
            aria-placeholder="אימייל"
            class=""
            v-model="tempLogo"
            filled
        >
          <template v-slot:prepend>
            <q-avatar>
              <img src="../../assets/camera-plus.png">
            </q-avatar>
          </template>
        </q-file>
        </div>

        <div class="column items-center">
          <q-btn
              class="width-50 -align-center"
              label="עדכן" type="submit" color="primary">

          </q-btn>
        </div>
      </q-form>
    </div>

  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {positive} from '../../middleware/utils/notify'
export default {
  name: "AddBusinessDetails",
  data: () => ({
    localInfoDetails: {
      BName: '',
      BEmail: '',
      BPhone: '',
      logo: ''
    },
    tempLogo:null
  }),
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('businesses', ['businessDetails']),
  },
  methods: {
    ...mapActions('businesses', ['addBusinessDetails', 'getBusinessDetails']),

    async onSubmit() {
      await this.addBusinessDetails(this.localInfoDetails)
      this.$q.notify(positive)
    },

    onReset() {
      this.name = null
      this.age = null
      this.accept = false
    }
  },

  async created() {
    if (this.user.isNewUser) {
      this.localInfoDetails.BEmail = this.user.email
    } else {
      await this.getBusinessDetails()
      this.localInfoDetails = {...this.businessDetails}
    }
  }
}
</script>

<style scoped>

</style>