<template>
  <div  class="background2 q-px-xl q-pt-xl ">
      <h5 class="creating">{{ localEditedEvent.id ? 'ערוך אירוע' : 'יצירת אירוע חדש' }}</h5>
    <div class="q-gutter-lg-y-lg">
      <q-input v-model="localEditedEvent.organizer" class="inputs" color="black" label="שם בעל האירוע" type="text"/>
      <q-select v-model="localEditedEvent.eventStyle" :options="options2" class="inputs" color="black"
                label="סוג האירוע"></q-select>
      <q-input v-model="localEditedEvent.place" class="inputs" color="black" label="מקום האירוע" type="text"/>
      <q-input v-model="localEditedEvent.date" class="inputs" color="black" label="מועד האירוע" type="date"></q-input>
      <q-input v-model="localEditedEvent.imgLimit" :max="10" :min="0" class="inputs" color="black" type="number"
               label="הגבלת תמונות"/>
    </div>
      <br><br><br>

    <q-btn v-if=" localEditedEvent.id" class="up" label="עדכון" @click="update()"/>
    <q-btn v-if="! localEditedEvent.id" class="creatEvent" label="צור אירוע" @click="blass(localEditedEvent)"/>

    <q-dialog v-model="persistent" transition-hide="scale">
      <q-card class="bg-teal text-white" style="width: 800px">

        <q-card-section dir="rtl" style="text-align: center">
          <div class="text-h6">מזל טוב!!</div>
        </q-card-section>

        <q-card-section class="q-pt-none" style="text-align: center">
          יצירת אירוע בוצעה בהצלחה!
        </q-card-section>

        <q-card-actions class="bg-white text-teal" style="text-align: center">
          <div>
            <q-btn v-close-popup flat label="המשך לדף האירוע" @click="insert()"/>
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import Vue from 'vue';
import VueConfetti from 'vue-confetti';
import {mapState, mapActions, mapMutations} from 'vuex';
Vue.use(VueConfetti);

export default {

  name: "AddItem",
  computed: mapState('events', ['editedEvent', 'editedEventId', 'eventId', 'editedEvent']),
  data() {

    return {
      persistent: false,
      small: false,
      text: '',
      eid: this.$route.params.id,
      localEditedEvent: {},
      all: null,
      options: ['אל תאפשר', 'אפשר'],
      options2: ['חתונה', 'אירוסים', 'חינה', 'בר מצווה',
        ' בת מצווה', ' ברית', ' בריתה', 'אירוע מנהלי', 'אחר']
    }
  },
  methods: {

    ...mapActions('events', ['insertEvent', 'updateEvent', 'setEditEventById']),
    ...mapMutations('events', ['setEditedEvent', 'setEditedEventId', 'setEventId']),

    localSetEditedEvent() {
      if (this.localEditedEvent.imgLimit > 10) {
        alert('לא ניתן להזין מעבר ל 10 תמונות')
        return false
      } else {
        this.setEditedEvent(this.localEditedEvent)
        return true
      }
    },

    goToHome() {
      this.$router.push('/home');
    },

    async blass() {
      const check = await this.localSetEditedEvent();
      if (check) {
        this.$confetti.start()
        this.persistent = true
      }
    },
    async insert() {
      const eid = await this.insertEvent();
      this.$confetti.stop()
      await this.$router.push(`/event-page/${eid}`);
    },


    update() {
      this.localSetEditedEvent();
      this.updateEvent();
      this.goToHome()
    }
  },

  async created() {
    if (this.eid) {
      Object.assign(this.localEditedEvent, this.editedEvent)
    }
  }
}

</script>

<style lang="scss" scoped>
.main {
  width: 40vw;

}

.inputs {
  margin-bottom: 40px;
}

.label-wrapper {
  margin: 0;
  flex: 0 0 100%;
  text-align: center;
}
.addInfo:hover{
filter: opacity(55%);
}
.up {
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-bottom: 50px;
  margin-top: -70px;
  width: 90%;
  height: 50px;
  font-size: 20px;
  background-color: #000023;
  color: antiquewhite;
  border-radius: 10px;
}

.creatEvent {
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-bottom: 50px;
  margin-top: -70px;
  width: 90%;
  height: 50px;
  font-size: 20px;
  background-color: #000023;
  color: antiquewhite;
  border-radius: 10px;
}

.creating {
  margin-top: 10px;
  text-align: center;

}

.background2 {
  width: 50%;
  background-color: rgba(255, 255, 255, 0.62);
  color: #000023;
}


</style>

