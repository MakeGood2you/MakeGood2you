<template>
  <div class="column items-center">
    <div class=" column items-center" style="margin-top: -40%">
      <h4> עזרה ותמיכה </h4>
    </div>
    <AddQuestionsAndAnswers></AddQuestionsAndAnswers>
    <div dir="rtl" class="full-width">
      <div class="q-pa-md">
        <q-list  padding  class="rounded-borders ladder">
          <q-expansion-item
              v-for="(item, key) in questionsAndAnswers.data" :key="key"
              dense
              dense-toggle
              expand-separator
              icon="help_outline"
              :label="item.question"
          >
            <q-card>
              <q-card-section style="background-color: #D9D2CD">
                {{ item.answer }}
              </q-card-section>
<!--              <q-card-actions>-->
<!--                <q-btn @click="removeQuestionAndAnswer(key)"> מחק</q-btn>-->
<!--              </q-card-actions>-->
            </q-card>
          </q-expansion-item>
        </q-list>
        <br>
        <div class="text-center">
          <q-btn
              style="width: 50%"
              color="dark"
              @click="$router.push('/home')"
          >חזור
          </q-btn>
        </div>
      </div>

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
  background-color: rgb(238, 234, 233);
}
</style>
