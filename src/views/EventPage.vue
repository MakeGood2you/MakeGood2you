<template>
  <div class="background3">

    <h5>דף אירוע</h5>

    <div class="main3" dir="rtl">

      <q-btn id="me7" label="תמונות מוזמנים" @click="picAdd"/>
      <br>
      <q-btn id="me8" label="ערוך אירוע" @click="updateFromEvent"/>
      <br>
      <q-btn id="me9" label="חזור" @click="goBack()"/>
    </div>
  </div>
</template>

<script>
import pictureAdded from "./pictureAdded"
import {mapState, mapActions} from 'vuex'


export default {
  name: "EventPage",

  components: {
    pictureAdded,
  },

  computed: mapState('events', ['event']),

  methods: {
    ...mapActions('events', ['getEventsById']),

    goBack() {
      this.$router.push('/home',)
    },

    updateFromEvent() {
      const id = this.$route.params.eid
      this.$router.push({name: 'Item', params: {id: id}})
    },

    goToId() {
      this.$router.push({
        name: 'contacts',
        params: {id: this.$route.params.eid}
      })
    },
    goToTable() {
      this.$router.push({
        name: 'contactTable',
        params: {id: this.$route.params.eid}
      })
    },
    picAdd() {
      this.$router.push(`/event-page/${this.$route.params.eid}/pictureAdded`)
    }
  },
  async created() {
    if (!window.user) {
      await this.$router.push('/')
    }
    await this.getEventsById()
  }
}

</script>

<style scoped>

.main3 {
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: auto;
}

#me7 {
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 90%;
  height: 50px;
  border: none;
  font-size: 15px;
  border-radius: 10px;

}

#me8 {
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 90%;
  height: 50px;
  border: none;
  font-size: 15px;
  border-radius: 10px;

}

#me9 {
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 90%;
  height: 50px;
  border: none;
  font-size: 15px;
  border-radius: 10px;
  background-color: #000023;
  color: #faebd7;
}

.background3 {
  margin-top: 20px;
  margin-left: 500px;
  margin-right: 500px;
  padding-top: 10px;
  padding-bottom: 50px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.62);
  border-radius: 10px;

}


</style>
