<template>
  <div class="q-mb-xl">
    <div class=" column items-center">
      <h4 class="top"> פרטי העסק </h4>
      <p> (יפורסם אצל המשתמשים) </p>
    </div>
    <div class=" q-pa-xl column center max-width-1 background back"  dir="rtl">
      <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
      >
        <AddImage :url="localInfoDetails.photoURL" @fileChange="isFileChange = true" ref="addImage"/>
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


        <div class="row justify-around">
          <q-btn
              class="width-50 -align-center btn1"
              label="עדכן" type="submit">
          </q-btn>
          <q-btn
              class="self-start btn1 btn2"
              label="חזור"
              @click="$router.push('/home')"
              color="gray">
          </q-btn>
        </div>
      </q-form>


    </div>

  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {positive} from '../../middleware/utils/notify'
import {getUserFromLocalStorage} from "../../middleware/utils";
import AddImage from "./AddImage";

const user = getUserFromLocalStorage()

export default {
  name: "AddBusinessDetails",
  components: {AddImage},
  data: () => ({
    localInfoDetails: {
      BName: '',
      BEmail: '',
      BPhone: '',
    },
    tempLogo: null,
    isFileChange: false
  }),
  computed: {
    ...mapState('businesses', ['businessDetails', 'currentImageProfile']),
  },
  methods: {
    ...mapActions('businesses', ['addBusinessDetails', 'getBusinessDetails']),

    async onSubmit() {
      this.isNewUser()
      if (this.isFileChange) {
        await this.$refs.addImage.userDetails()
        this.localInfoDetails.photoURL = this.currentImageProfile
      }
      console.log(this.localInfoDetails)
      await this.addBusinessDetails(this.localInfoDetails)
      await this.$router.push('/home')
      // this.$q.notify(loading(false))
      this.$q.notify(positive('הפרטים עודכנו בהצלחה :)'))
    },

    onReset() {
      this.name = null
      this.age = null
      this.accept = false
    },
    isNewUser() {
      if (user.isNewUser) {
        for (const key in this.localInfoDetails) {
          if (this.localInfoDetails[key] && this.localInfoDetails[key] !== user[key]) {
            user.isNewUser = false
            localStorage.setItem('user', JSON.stringify(user))
            break;
          } else return
        }
      }
    }
  },

  async created() {
    if (user.isNewUser) {
      this.localInfoDetails.BEmail = user.email
      this.localInfoDetails.photoURL = window.user.photoURL
    } else {
      await this.getBusinessDetails()
      this.localInfoDetails = {...this.businessDetails}
      console.log(this.localInfoDetails)

    }
  }
}
</script>

<style scoped>

.top {
  margin-top: -100px;
}
.back{
  background-color: rgba(255, 255, 255, 0.43);
}
.btn1 {
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-bottom: 50px;
  width: 100%;
  height: 50px;
  border: none;
  font-size: 20px;
  background-color: #000023;
  color: antiquewhite;
}

.btn2 {
  margin-top: -30px;
  background-color: #6c6c6c;
}
</style>
