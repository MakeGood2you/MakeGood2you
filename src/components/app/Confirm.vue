<template>
  <q-dialog @escape-key="isOpenDialog" v-model="isOpen">
    <q-card>
      <q-toolbar>
        <q-avatar>
          <img src="../../assets/logo2.png">
        </q-avatar>

        <q-toolbar-title><span class="text-weight-bold text-center">PicPic</span> </q-toolbar-title>

        <q-btn flat round dense icon="close" @click="isOpenDialog"/>
      </q-toolbar>

      <q-card-section>
        {{ confirmDialog.message }}
      </q-card-section>
      <q-card-actions class="row justify-around">
        <q-btn @click="chekResult(true)" label="כן לצערי"></q-btn>
        <q-btn @click="isOpenDialog" label="לא התחרטתי"></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "Confirm",
  computed: mapState('app', ['confirmDialog', 'isOpen']),
  methods: {
    ...mapMutations('app', ['setResult','isOpenDialog']),
    ...mapActions('businesses', ['billingRecurringCancelAction']),

    async chekResult(res){
      this.setResult(res)
      if (!this.confirmDialog.result) {
        return console.log('ohhhh almost')
      }
      await this.billingRecurringCancelAction()
      console.log('costumer as deleted')
      this.isOpenDialog()
    }

  }
}
</script>

<style scoped>

</style>