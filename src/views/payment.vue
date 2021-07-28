<template>
  <div class="column items-center">

    <div dir="rtl" class="text-center q-pa-lg column container-payment">
      <p class="q-my-lg">
        בחר את התכנית שלך</p>
      <div class="column items-start">
        <div class="column q-gutter-y-sm items-start">
          <p>
            <q-icon name="check"/>
            יצירת אירועים ללא הגבלה
          </p>
          <p>
            <q-icon
                name="check"/>
            כמות מוזמנים ללא הגבלה

          </p>
          <p>
            <q-icon name="check"/>
            אפשרות הגבלת תמונות למוזמן
          </p>
          <p>
            <q-icon
                name="check"
            />
            הצגת לידים
          </p>
          <p>
            <q-icon
                name="add"
            />
            רולאפ מתנה !

          </p>
        </div>

      </div>
      <div class="row q-gutter-lg q-my-lg justify-center">
        <q-btn @click="month" class="month"
               style="font-family: 'Open Sans Hebrew Condensed', serif;  background-color: rgb(135,135,135);"
               dir="rtl">
          <p style="font-size: 32px; color: white"><br>חודשי<br>
          <p style="font-size: 32px; color: white"><b>350 ש"ח</b><br><br>
          <p
              style="text-decoration-line: line-through; color: #fffdfd; font-size: 30px;" class="insted">500 ש"ח</p>
        </q-btn>
        <q-btn @click="halfYear" class="halfYear"
               style="font-family: 'Open Sans Hebrew Condensed', serif; background-color: rgb(31,65,123);" dir="rtl">
          <p style="font-size: 32px; color: white"><br>חצי שנתי<br>
          <p style="font-size: 32px; color: white"><b>1,750 ש"ח</b><br>
          <p
              style="text-decoration-line: line-through; color: #ffffff; font-size: 30px;" class="insted">2100 ש"ח</p>
        </q-btn>
        <q-btn @click="year" class="year"
               style="font-family: 'Open Sans Hebrew Condensed', serif; background-color: rgb(135,135,135);"
               dir="rtl">
          <p style="font-size: 32px; color: white"><br> שנתי
          <p style="font-size: 32px; color: white"><b>2,850 ש"ח</b><br>
          <p
              style="text-decoration-line: line-through; color: #ffffff; font-size: 30px;" class="insted">4200 ש"ח</p>
        </q-btn>

      </div>
    </div>

  </div>
</template>

<script>
import {mapActions} from 'vuex'
import Setting from '../components/app/Settings'

export default {
  name: "payment",
  components: {Setting},
  data() {
    return {}
  },
  methods: {
    ...mapActions('businesses', ['setPackagePayment']),
    async month() {
      let paymentMethod = 'month'
      await this.setPackagePayment(paymentMethod)
      window.location.href = 'https://www.myofficeguy.com/p/1ionde/1le5kn/1le5j6/payment/';
    },
    async halfYear() {
      let paymentMethod = 'halfYear'
      await this.setPackagePayment(paymentMethod)
      window.location.href = 'https://www.myofficeguy.com/p/1ionde/1le5jj/1lfcy0/payment/';
    },
    async year() {
      let paymentMethod = 'year'
      await this.setPackagePayment(paymentMethod)
      window.location.href = 'https://www.myofficeguy.com/p/1ionde/1le5ju/1lfdkf/payment/';
    },
    async day() {
      let paymentMethod = 'day'
      await this.setPackagePayment(paymentMethod)
      window.location.href = 'https://www.myofficeguy.com/p/1ionde/1lmm5p/1lmmcy/payment/';
    }
  },
}
</script>

<style lang="scss" scoped>
@import url(https://dl.dropboxusercontent.com/u/15746367/fonts/carmela/style.css);
@import url(https://fonts.googleapis.com/earlyaccess/alefhebrew.css);
@import url(https://fonts.googleapis.com/earlyaccess/opensanshebrewcondensed.css);
@import "./src/styles/media";


.month, .halfYear, .year {
  width: 170px;
  height: 200px;
}
.month:hover, .halfYear:hover, .year:hover {
filter: opacity(80%);
}
.insted {
  margin-right: 20px;
  /* Safari */
  -webkit-transform: rotate(5deg);

  /* Firefox */
  -moz-transform: rotate(5deg);

  /* IE */
  -ms-transform: rotate(5deg);

  /* Opera */
  -o-transform: rotate(5deg);

  float: right;

}

</style>
