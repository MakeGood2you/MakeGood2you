<template>
  <div class="column items-center">
    <AddQuestionsAndAnswers></AddQuestionsAndAnswers>
    <span class="text-h6" style="margin-top: -35%">שאלות ותשובות</span>
    <div dir="rtl" class="full-width">
      <div class="q-pa-md">
        <q-list  padding bordered class="rounded-borders ladder">
          <q-expansion-item
              v-for="(item, key) in questionsAndAnswers.data" :key="key"
              dense
              dense-toggle
              expand-separator
              icon="help_outline"
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


.ladder {
  width: 50%;
  display: flex;
  flex-direction: column;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.43);
}
</style>
