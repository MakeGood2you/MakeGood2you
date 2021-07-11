<template>
  <q-dialog v-model="isOpen">
    <q-card>
      <q-toolbar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg">
        </q-avatar>

        <q-toolbar-title><span class="text-weight-bold">PicPic</span> for fun</q-toolbar-title>

        <q-btn flat round dense icon="close" v-close-popup/>
      </q-toolbar>

      <q-card-section>
        {{ confirmDialog.message }}
      </q-card-section>
      <q-card-actions class="row justify-around">
        <q-btn @click="chekResult(false)" label="כן לצערי"></q-btn>
        <q-btn @click="chekResult(false)" label="לא התחרטתי"></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "Confirm",
  computed: mapState('app', ['confirmDialog', 'isOpen']),
  methods: {
    ...mapMutations('app', ['setResult','isOpenDialog']),
    chekResult(res){
      this.setResult(res)
      this.isOpenDialog()
    }
  }
}
</script>

<style scoped>

</style>