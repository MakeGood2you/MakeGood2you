<template>
  <div class="column items-center">
    <AddQuestionsAndAnswers></AddQuestionsAndAnswers>
    <span class="text-h6">שאלות ותשובות</span>
    <div dir="rtl">
      <div class="q-pa-md">
        <q-list padding bordered class="rounded-borders">
          <q-expansion-item
              v-for="(item, key) in questionsAndAnswers.data" :key="key"
              dense
              dense-toggle
              expand-separator
              icon="perm_identity"
              :label="item.question"
          >
            <q-card>
              <q-card-section>
                {{ item.answer }}
              </q-card-section>
              <q-card-actions>
                <q-btn @click="removeQuestionAndAnswer(key)"> מחק</q-btn>
              </q-card-actions>
            </q-card>

          </q-expansion-item>
        </q-list>
      </div>
      <q-btn class="q-mr-lg self-start"
             @click="$router.push('/home')"
      >חזור
      </q-btn>
      <q-btn class="q-mr-lg self-start"
             @click="openDialog"
      >הוסף
      </q-btn>

    </div>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import AddQuestionsAndAnswers from "./AddQuestionsAndAnswers";

export default {
  name: "QuestionsAndAnswers",
  computed: mapState('app', ['questionsAndAnswers']),
  components: {AddQuestionsAndAnswers},
  methods: {
    ...mapMutations('app', ['isOpenDialog']),
    ...mapActions('app', ['getQuestionsAndAnswers', 'removeQuestionAndAnswerAction']),
    openDialog() {
      this.isOpenDialog()
    },
    removeQuestionAndAnswer(key) {
      console.log(key)
      this.removeQuestionAndAnswerAction(key)
    }
  },
  created() {
    this.getQuestionsAndAnswers()
  }
}
</script>

<style scoped>

</style>