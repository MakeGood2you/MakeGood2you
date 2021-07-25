<template>
<div dir="rtl" class="background2 q-px-xl q-py-xl q-my-auto q-mx-auto">
   <h5 class="text-center">הוסף הערה</h5>
    <q-form @submit="onSubmit" >
      <q-input
          v-model="text"
          filled
          autogrow
          placeholder="הזן הערה"
          name="text"


      />
      <div>
        <q-btn label="הוסף" type="submit" color="primary" class="full-width"/>
      </div>
    </q-form>
</div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "CommentInput",
  data: () => ({
    text: ''
  }),
  methods: {
    onSubmit(evt) {
      this.$emit('onSubmit',this.text)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/quasar.variables";

.background2 {
  width:50vw;
  background-color: #e8e3df;
//background-color: rgba(255, 255, 255, 0.62) !important;
  color: $primary;
  border-radius: 10px;
  opacity: 1;
}

</style>