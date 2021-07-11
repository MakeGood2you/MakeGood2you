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

    async billingRecurringCancelClient() {
      this.isOpenDialog()
      this.setMessage('האם אתה בטוח שאתה רוצה להתנתק מהשירות?')
      debugger
      if (!this.confirmDialog.result) return console.log('ohhhh almost')
      debugger
      await this.billingRecurringCancelAction()
      console.log('costumer as deleted')
    },

  }
}
</script>

<style scoped>

</style>