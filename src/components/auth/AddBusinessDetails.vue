<template>
  <div class="column items-center">
    <h4> פרטי העסק </h4>
  <p> (יפורסם אצל המשתמשים) </p>
    <q-card>
      <q-card-section>
        <div dir="rtl">
          <p>הזן פרטי עסק:</p>
          <q-input v-model="localInfoDetails.BName" placeholder="שם העסק" type="text"/>
          <q-input v-model="localInfoDetails.BEmail" placeholder="אימייל" type="email"/>
          <q-input v-model="localInfoDetails.BPhone" placeholder="טלפון" mask="###-###-####"/>
          <br>
          <q-btn style="width: 100%; background-color: #008e24" >פרסם!</q-btn>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "AddBusinessDetails",
  data: () => ({
    localInfoDetails: {
      BName: '',
      BEmail: '',
      BPhone: ''
    }
  }),
}
</script>

<style scoped>

</style>