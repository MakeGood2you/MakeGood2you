<template>
  <div class="relative-position main column items-center">
    <QuestionsAndAnswers class=""/>
  </div>
</template>

<script>
import QuestionsAndAnswers from "../../components/app/QuestionsAndAnswers/QuestionsAndAnswers";
export default {
  name: "HelpAndSupport",
  components:{QuestionsAndAnswers},
  data: () => ({

  }),

}
</script>

<style scoped>
.main{
margin: auto;
  max-width: 53%;
}
.relative-position {
  bottom: 9.5rem;
}

</style>