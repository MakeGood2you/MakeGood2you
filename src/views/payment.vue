<template>
  <div class="body">
    <div dir="rtl" class="background4">
      <p style="font-size: 60px; color: #000000; font-family: 'Open Sans Hebrew Condensed', serif; ">
        בחר את התכנית שלך</p><br>
      <div
          style="text-align: right; color: #500000; font-size: 30px; margin-right: 30px;   font-family: 'Open Sans Hebrew Condensed', serif;"
          dir="rtl">
        <p style="font-size: 25px"><b>
          <q-icon
              name="check"
              style="color: #00383d;
          width: 30px;
          font-size: 30px;"
          />
        </b> יצירת אירועים ללא הגבלה
        </p>
        <p style="font-size: 25px"><b>
          <q-icon
              name="check"
              style="color: #00383d;
          width: 30px;
          font-size: 30px"
          />
        </b> כמות מוזמנים ללא הגבלה
        </p>
        <p style="font-size: 25px"><b>
          <q-icon
              name="check"
              style="color: #00383d;
          width: 30px;
          font-size: 30px"
          />
        </b> אפשרות הגבלת תמונות למוזמן
        </p>
        <p style="font-size: 25px"><b>
          <q-icon
              name="check"
              style="color: #00383d;
          width: 30px;
          font-size: 30px"
          />
        </b>הצגת לידים
        </p>
        <p style="font-size: 25px"><b>
          <q-icon
              name="add"
              style="color: #00383d;
          width: 30px;
          font-size: 30px"
          />
        </b>רולאפ מתנה !
        </p>
      </div>
      <br>
      <q-btn @click="halfYear" class="halfYear"
             style="font-family: 'Open Sans Hebrew Condensed', serif; background-color: rgb(135,135,135);" dir="rtl">
        <p style="font-size: 32px; color: white"><br>חצי שנתי<br>
        <p style="font-size: 32px; color: white"><b>1,750 ש"ח</b><br><p
            style="text-decoration-line: line-through; color: #ffffff; font-size: 30px;" class="insted">2100 ש"ח</p>
      </q-btn>
      <q-btn @click="month" class="month"
             style="font-family: 'Open Sans Hebrew Condensed', serif; background-color: rgb(31,65,123);" dir="rtl">
        <p style="font-size: 32px; color: white"><br>חודשי<br>
        <p style="font-size: 32px; color: white"><b>350 ש"ח</b><br><br><p
          style="text-decoration-line: line-through; color: #fffdfd; font-size: 30px;" class="insted">500 ש"ח</p>
      </q-btn>
      <q-btn @click="year" class="year" style="font-family: 'Open Sans Hebrew Condensed', serif; background-color: rgb(135,135,135);"
             dir="rtl">
        <p style="font-size: 32px; color: white"><br> שנתי
        <p style="font-size: 32px; color: white"><b>2,850 ש"ח</b><br><p
            style="text-decoration-line: line-through; color: #ffffff; font-size: 30px;" class="insted">4200 ש"ח</p>
      </q-btn>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "payment",
  data() {
    return {}
  },
  methods: {
    ...mapActions('events', ['setPackagePayment',]),
    ...mapActions('auth', ['isUserConnected',]),

    month() {
      let paymentMethod = 'month'
      this.setPackagePayment(paymentMethod)
      window.location.href = 'https://www.myofficeguy.com/p/1ionde/1le5kn/1le5j6/payment/';
    },
    halfYear() {
      let paymentMethod = 'halfYear'
      this.setPackagePayment(paymentMethod)
      window.location.href = 'https://www.myofficeguy.com/p/1ionde/1le5jj/1le5jq/payment/';
    },
    year() {
      let paymentMethod = 'year'
      this.setPackagePayment(paymentMethod)
      window.location.href = 'https://www.myofficeguy.com/p/1ionde/1le5ju/1le617/payment/';
    }
  },
  created() {
    this.isUserConnected()
  }
}
</script>

<style scoped>
@import url(https://dl.dropboxusercontent.com/u/15746367/fonts/carmela/style.css);
@import url(https://fonts.googleapis.com/earlyaccess/alefhebrew.css);
@import url(https://fonts.googleapis.com/earlyaccess/opensanshebrewcondensed.css);

.background4 {
  width: 700px;
  position: relative;
  padding-top: 30px;
  padding-bottom: 30px;
  text-align: center;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.5);

}

.body {
  margin-top: -70px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.month, .halfYear, .year {
  margin-right: 20px;
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
