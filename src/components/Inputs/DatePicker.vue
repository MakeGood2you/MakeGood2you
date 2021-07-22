<template>
      <q-input hint="מועד האירוע" filled v-model="date"  :rules="['YYYY-MM-DD']">
        <template v-slot:append>
          <q-icon name="event"  class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" transition-show="flip" transition-hide="scale">
              <q-date
                  name="wedding"
                  class="date-picker "
                  mask="YYYY-MM-DD"
                  today-btn
                  v-model="date"
              >
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
</template>

<script>

export default {
  props: ['label', 'editedDate'],
  name: "DatePicker",
  data() {
    return {
      date: '',
      submitResult: []

    }
  },
  methods: {
    onSubmit(evt) {
      debugger
      const formData = new FormData(evt.target)
      const submitResult = []
      for (const [name, value] of formData.entries()) {
        submitResult.push({
          name,
          value
        })
      }
      this.submitResult = submitResult
    }
  },
  created() {
    if (!this.editedDate) {
      this.date = new Date().toISOString().substring(0, 10)
    } else {
      this.date = this.editedDate
    }
  },
  watch: {
    date() {
      if (this.date === this.editedDate) return
      this.$emit('dateChange', this.date)
    }
  }
}
</script>

<style scoped>

</style>