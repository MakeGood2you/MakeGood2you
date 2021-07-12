<template>
  <q-dialog v-model="isOpen">
    <q-card>
      <q-toolbar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" alt="defaultImg">
        </q-avatar>

        <q-toolbar-title><span class="text-weight-bold">PicPic</span> for fun</q-toolbar-title>
        <q-btn flat round dense icon="close"
               @click="isOpenDialog"
               v-close-popup/>
      </q-toolbar>

      <q-card-section>

        <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-xl"
        >
          <q-input
              filled
              v-model="data.question"
              label="Your Question *"
              hint="Name and surname"
              :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-input
              filled
              type="textarea"
              v-model="data.answer"
              label="Your Answer *"
              :rules="[ val => val && val.length > 0 || 'Please type something']"

          />
          <div>
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
          </div>
        </q-form>

      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import {positive} from "../../../middleware/utils/notify";

export default {
  name: "AddQuestionsAndAnswers",
  data: () => ({
    data: {
      question: '',
      answer: ''
    },
  }),
  computed: mapState('app', ['questionsAndAnswers', 'isOpen']),

  methods: {
    ...mapActions('app', ['addQuestionsAndAnswers','getQuestionsAndAnswers']),
    ...mapMutations('app', ['isOpenDialog']),
    onSubmit() {
      this.addQuestionsAndAnswers(this.data)
      this.$q.notify(positive('התווסף בהצלחה :)'))
      this.isOpenDialog()
    },

    onReset() {
      this.name = null
      this.age = null
      this.accept = false
    },
    created(){
    }
  }

}
</script>

<style scoped>

</style>
