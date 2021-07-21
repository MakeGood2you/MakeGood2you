<template>
  <div class="main q-py-lg q-px-xl q-m-a">
  <div class="row q-py-lg no-wrap justify-around">
<!--    <q-btn color="primary" class="self-center" icon="arrow_back_ios" round @click="goToHome">-->
<!--      <q-tooltip anchor="top middle" self="center middle" transition-show="rotate" transition-hide="flip-left">-->
<!--        <strong>חזור הביתה</strong>-->
<!--        (<q-icon name="keyboard_arrow_down"/>)-->
<!--      </q-tooltip>-->
<!--    </q-btn>-->

    <h5>    <strong>דף אירוע</strong></h5>
  </div>
    <div class="column items-center q-gutter-y-md" dir="rtl">
      <q-btn class="me"   label="תמונות מוזמנים" @click="picAdd"/>
      <q-btn class="me"   label="ערוך אירוע" @click="updateFromEvent"/>
      <q-btn class="me" color="primary"  label="חזור" @click="goBack"/>
      <br>
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

<style lang="scss" scoped>
@import "src/styles/quasar.variables";
.main{
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.62);
  width: 50vw;
}

.me {
  width: 90%;
  height: 50px;
  border-radius: 10px;

}


</style>
