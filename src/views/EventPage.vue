<template>
  <div class="column items-center">
  <div class="main column items-center">

    <h5>דף אירוע</h5>

    <div class="main2" dir="rtl">

      <q-btn class="me" label="תמונות מוזמנים" @click="picAdd"/>
      <br>
      <q-btn class="me" label="ערוך אירוע" @click="updateFromEvent"/>
      <br>
      <q-btn class="me9" label="חזור" @click="goBack()"/>
    </div>
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
    ...mapActions('events', ['getEventById']),

    goBack() {
      this.$router.push('/home',)
    },

    updateFromEvent() {
      const id = this.$route.params.eid
      this.$router.push({name: 'Event', params: {id: id}})
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
    await this.getEventById()
  }
}

</script>

<style scoped>
.main{
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.62);
  padding-top: 10px;
  padding-bottom: 50px;
  width: 50vw;
}

.main2 {
  width: 90%;
}

.me {
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

.me9 {
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

  text-align: center;
  background-color: rgba(255, 255, 255, 0.62);

}


</style>
