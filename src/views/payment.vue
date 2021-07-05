<template>
  <div class="body">
    <div dir="rtl" class="background4">
      <link rel="preconnect" href="https://fonts.gstatic.com">
      <link href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&display=swap" rel="stylesheet">
      <p style="font-size: 60px; color: #000000; @import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&display=swap');font-family: 'Amatic SC', cursive; ">
        חבילות</p><br>
      <div
          style="text-align: right; color: #500000; font-size: 30px; margin-right: 30px; font-family:  'Amatic SC', cursive;"
          dir="rtl">
        <p style="font-size: 35px"><b>
          <q-icon
              name="check"
              style="color: #00383d;
          width: 30px;
          font-size: 30px;"
          />
        </b> יצירת אירועים ללא הגבלה
        </p>
        <p style="font-size: 35px"><b>
          <q-icon
              name="check"
              style="color: #00383d;
          width: 30px;
          font-size: 30px"

          />
        </b> כמות מוזמנים ללא הגבלה
        </p>
        <p style="font-size: 35px"><b>
          <q-icon
              name="check"
              style="color: #00383d;
          width: 30px;
          font-size: 30px"
          />
        </b> אפשרות הגבלת תמונות למוזמן
        </p>
        <p style="font-size: 35px"><b>
          <q-icon
              name="check"
              style="color: #00383d;
          width: 30px;
          font-size: 30px"
          />
        </b>הצגת לידים
        </p>
      </div><br>
      <q-btn @click="month" class="month" style="font-family: 'Amatic SC', cursive;  background-color: rgb(142,174,194);" dir="rtl">
        <p style="font-size: 32px" ><br>חודשי<br><p style="font-size: 40px"><b>150 ש"ח</b><br><br><b style="text-decoration-line: line-through; color: #fffdfd; font-size: 30px;" class="insted">250 ש"ח</b></p>
      </q-btn>
      <q-btn @click="halfYear" class="halfYear" style="font-family: 'Amatic SC', cursive; background-color: rgb(70,123,147);" dir="rtl">
        <p style="font-size: 32px" ><br><b>חצי שנה + <br>שבועיים חינם!</b><p style="font-size: 40px"><b>600 ש"ח</b><br><br><b style="text-decoration-line: line-through; color: #ffffff; font-size: 30px;" class="insted">900 ש"ח</b></p>
      </q-btn>
      <q-btn @click="year" class="year" style="font-family: 'Amatic SC', cursive; background-color: rgb(36,91,121);" dir="rtl">
        <p style="font-size: 32px" ><br><b>שנה + <br>חודש חינם!</b><p style="font-size: 40px"><b>1,000 ש"ח</b><br><br><b style="text-decoration-line: line-through; color: #ffffff; font-size: 30px;" class="insted">1,600 ש"ח</b></p>
      </q-btn>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "payment",
data(){
    return {
      uid:window.user.uid,
  }
},
  methods: {
    ...mapActions('events', ['setPackagePayment']),

    month() {
      let paymentMethod = 'month'
      this.setPackagePayment(paymentMethod)
      window.location.href = 'https://www.myofficeguy.com/p/1ionde/1iyla6/1iyla7/payment/';
    },
    halfYear() {
      let paymentMethod = 'halfYear'
      this.setPackagePayment(paymentMethod)
      window.location.href = 'https://www.myofficeguy.com/p/1ionde/1j1kkt/1j1kj9/payment/';
    },
    year() {
      let paymentMethod = 'year'
      this.setPackagePayment(paymentMethod)
      window.location.href = 'https://www.myofficeguy.com/p/1ionde/1j1kja/1j1klb/payment/';
    }
  }
}
</script>

<style scoped>
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
.month, .halfYear, .year{
  margin-right: 20px;
  width: 170px;
  height: 200px;
}

.insted{


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
