<template>
  <div id="q-app events" class="main" dir="rtl">
    <div class="q-pa-md background2">
      <h5 class="creating">יצירת אירוע חדש</h5>
      <q-input v-model="localEditedEvent.organizer" class="inputs" color="black"  label="שם בעל האירוע" type="text"/>
      <q-select v-model="localEditedEvent.eventStyle" :options="options2" class="inputs" color="black" label="סוג האירוע"></q-select>
      <q-input v-model="localEditedEvent.place" class="inputs" color="black"  label="מקום האירוע" type="text"/>
      <q-input v-model="localEditedEvent.date" class="inputs" color="black"  label="מועד האירוע" type="date"></q-input>
      <q-input v-model="localEditedEvent.imgLimit" :max="10" :min="0" class="inputs"  color="black"  type="number" label="הגבלת תמונות"/>

      <br><br><br>
    </div>

    <q-btn v-if="editedEventId" class="up" label="עדכון" @click="update()"/>
    <q-btn v-if="!editedEventId" class="creatEvent" label="צור אירוע" @click="blass(localEditedEvent)"/>

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
  props: ['tableName'],
  computed: mapState('events', ['editedEvent', 'editedEventId', 'eventId', 'editedEvent']),
  data() {

    return {
      persistent: false,
      small: false,
      text: '',

      localEditedEvent: {
        eventStyle: '',
        place: '',
        date: '',
        organizer: '',
        imgLimit: '',
      },
      all: null,
      options: ['אל תאפשר', 'אפשר'],
      options2: ['חתונה', 'אירוסים', 'חינה', 'בר מצווה',
        ' בת מצווה', ' ברית', ' בריתה', 'אירוע מנהלי', 'אחר']
    }
  },
  methods: {

    ...mapActions('events', ['insertEvent', 'updateEvent','setInfoData', 'setEditEventById']),
    ...mapMutations('events', ['setEditedEvent', 'setEditedEventId', 'setEventId']),
    localSetEditedEvent() {
      debugger
      if (this.localEditedEvent.imgLimit > 10) {
        debugger
        alert('לא ניתן להזין מעבר ל 10 תמונות')
        return false
      } else {
        debugger
        this.setEditedEvent(this.localEditedEvent)
      }
    },
     publish(){
       this.setInfoData(this.localInfoDetails)
       this.small= false
    },
    goToHome() {
      this.$router.push('/home');
    },

    async blass() {
      const check = await this.localSetEditedEvent();
      if (check != false) {
        this.$confetti.start()
        this.persistent = true
      }
    },
    async insert() {
      await this.localSetEditedEvent();
      await this.insertEvent();
      this.$confetti.stop()
      await this.$router.push(`/event-page/${this.eventId}`);
    },


    update() {
      this.localSetEditedEvent();
      this.updateEvent();
      this.goToHome()
    }
  },

  created() {

    this.setEditedEventId(this.$route.params.id)
    this.setEditEventById()
        .then(() => {
          Object.assign(this.localEditedEvent, this.editedEvent)

        })
  }
}

</script>

<style lang="scss" scoped>
.main {
  width: 20%;
  display: flex;
  flex-direction: column;
  margin: auto;
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
  margin-top: -35%;
  background-color: rgba(255, 255, 255, 0.62);
  color: #000023;
  padding: 10%;
  border-radius: 10px;
}


</style>

