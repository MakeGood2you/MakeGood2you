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
import {mapActions, mapState} from "vuex";

export default {
  name: "welcome",
  computed:mapState('auth', ['user']),
  methods:{
    ...mapActions('events', ['welcomeFunction']),
    setAndPush(){

     const payload = {data: this.$route.query}
     // await this.welcomeFunction(payload).then(() => {
        if (user.isNewUser){
          this.$router.push('/add-business-details')
          debugger
        }
       else {
         debugger
         this.$router.push('/Home')
        }
     // })
    }
  },created() {

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
