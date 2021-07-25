<template>
  <div class="column items-center ">
    <AddQuestionsAndAnswers></AddQuestionsAndAnswers>
    <span class="text-h6 text-center" >שאלות ותשובות</span>
    <div dir="rtl" class="full-width" >
      <div class="q-pa-sm column items-center">
        <q-list   style="max-width: 600px"  class="">
         <div
             v-for="(item, key) in questionsAndAnswers.data" :key="key"

         >
          <q-expansion-item
              class="q-pa-md text-h6 text-bold"
              group="somegroup"

              dense-toggle
              icon="help_outline"
              :label="item.question"
          >
            <q-card>
              <q-card-section
                  class="text-subtitle2"
              >
                {{ item.answer }}
              </q-card-section>
              <q-card-actions>
                <q-btn @click="removeQuestionAndAnswer(key)"> מחק</q-btn>
              </q-card-actions>
            </q-card>

          </q-expansion-item>
           <q-separator class="q-mx-lg"/>

         </div>
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
