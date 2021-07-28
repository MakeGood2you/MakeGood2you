<template>
  <div class="column items-center">
    <AddQuestionsAndAnswers></AddQuestionsAndAnswers>
    <div class=" column items-center">
      <h4> עזרה ותמיכה </h4>
    </div>

    <div style="width: 60vh" dir="rtl" class="ladder q-mt-none">
        <q-list class="" >

          <q-expansion-item
              v-for="(item, key) in questionsAndAnswers.data" :key="key"
              group="questionsAndAnswers"
              class="q-pa-md full-width text-h6"
              dense-toggle
              expand-separator
              icon="help_outline"
              :label="item.question"
          >
            <q-card style="max-width: 100%">
              <q-card-section
                  style="background-color: #D9D2CD"
                  class="text-subtitle2"
              >
                {{ item.answer }}
              </q-card-section>
              <!--              <q-card-actions>-->
              <!--                <q-btn @click="removeQuestionAndAnswer(key)"> מחק</q-btn>-->
              <!--              </q-card-actions>-->
            </q-card>
          </q-expansion-item>
          <q-separator class="q-mx-lg"/>

          <br>
          <div class="text-center">
            <q-btn
                style="width: 90%; font-size: 20px"
                color="dark"
                @click="$router.push('/home')"
            >חזור
            </q-btn>
          </div>
        </q-list>
        <br>
      </div>
      <!--      <q-btn class="q-mr-lg self-start"-->
      <!--             @click="openDialog"-->
      <!--      >הוסף-->
      <!--      </q-btn>-->

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
  padding: 10px 0px;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  background-color: rgb(238, 234, 233);
}
</style>
