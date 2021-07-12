<template>
  <q-btn
      class="self-end"
      @click="billingRecurringCancelClient"
      no-caps
      color="black"
      flat
      dense
  >
    <span>התנתקות מהשירות</span>
    <q-icon name="account_circle"></q-icon>
  </q-btn>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "Disengagement",
  computed: mapState('app', ['confirmDialog']),
  methods: {
    ...mapActions('businesses', ['billingRecurringCancelAction']),
    ...mapMutations('app', ['isOpenDialog','setMessage']),

     billingRecurringCancelClient() {
      this.isOpenDialog()
      this.setMessage('האם אתה בטוח שאתה רוצה להתנתק מהשירות?')
    },

  }
}
</script>

<style scoped>

</style>