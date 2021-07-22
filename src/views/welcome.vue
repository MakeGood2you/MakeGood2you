<template>
<div style="margin-top: 200px; direction: rtl">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&display=swap" rel="stylesheet">

  <img src="../assets/osher.png" alt="picpic" width="180" style="display: flex; flex-direction: column; margin: auto">
  <div class="body">
  <h2 style="font-size: 120px; color: #f8eee3; @import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&display=swap');font-family: 'Amatic SC', cursive; ">ברוכים הבאים!</h2>
</div>
</div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "welcome",
  methods: {
    ...mapActions('businesses', ['setPayment']),
    async setAndPush() {
      debugger
      const payload = {data: this.$route.query}
      await this.setPayment(payload)
      await this.$router.push('/add-business-details')
    }
  }, created() {

    this.setAndPush()
  }
}
</script>

<style scoped>
.body {
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>
