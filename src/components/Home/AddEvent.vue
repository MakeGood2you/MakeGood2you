<template>
  <div class="background2 q-px-xl q-py-xl q-my-auto q-mx-auto">

    <div class="row no-wrap justify-between  q-pb-md">
      <q-btn v-if="localEditedEvent.id" color="primary" class="self-center" icon="arrow_back_ios" round @click="goToHome">
        <q-tooltip anchor="top middle" self="center middle" transition-show="rotate" transition-hide="flip-left">

          <strong>חזור הביתה</strong>
          (<q-icon name="keyboard_arrow_down"/>)
        </q-tooltip>
      </q-btn>
    </div>
    <h5 class="text-center">  <strong> {{ localEditedEvent.id ? 'ערוך אירוע' : 'יצירת אירוע חדש' }}</strong></h5>

    <div class="q-mt-lg">
      <q-form
          dir="rtl"
          class="q-gutter-y-lg"
      >
        <q-input filled v-model="localEditedEvent.organizer" class="inputs" color="black" placeholder="שם בעל האירוע"
                 :hint="localEditedEvent.id ? 'שם בעל האירוע': ''" type="text"/>
        <q-select filled v-model="localEditedEvent.eventStyle" :options="options2" class="inputs" color="black"
                  :hint="localEditedEvent.id ? 'סוג האירוע': ''" placeholder="סוג האירוע"></q-select>
        <q-input filled v-model="localEditedEvent.place" :hint="localEditedEvent.id ? 'מקום האירוע': ''" class=""
                 color="black" placeholder="מקום האירוע" type="text"/>
        <DatePicker class="" @dateChange="dateChange" label="מועד האירוע" :editedDate="localEditedEvent.date"/>
        <q-input filled v-model="localEditedEvent.imgLimit" :max="10" :min="0" class="inputs" color="black"
                 type="number"
                 :hint="localEditedEvent.id ? 'הגבלת תמונות': ''" placeholder="הגבלת תמונות"/>
      </q-form>


      <br><br><br>

      <div class="row no-wrap items-center q-mx-auto">
        <q-btn v-if=" localEditedEvent.id" class="btn-submit column items-center" @click="update()"><span>עדכון</span>
        </q-btn>
        <q-btn v-if="! localEditedEvent.id" class="btn-submit column items-center" @click="blass(localEditedEvent)">
          <span>צור אירוע</span>
        </q-btn>
      </div>
    </div>
    <q-dialog v-model="persistent" transition-hide="scale">
      <q-card class="bg text-white" style="width: 800px">

        <q-card-section dir="rtl" style="text-align: center">
          <div class="text-h6">מזל טוב!!</div>
          <span><strong>יצירת אירוע בוצעה בהצלחה! </strong></span>
        </q-card-section>

      </q-card>
    </q-dialog>

  </div>
</template>

<script>
import Vue from 'vue';
import VueConfetti from 'vue-confetti';
import {mapState, mapActions, mapMutations} from 'vuex';
import DatePicker from "../Inputs/DatePicker";
import {positive} from "../../middleware/utils/notify";
Vue.use(VueConfetti);

export default {

  name: "AddItem",
  components: {DatePicker},
  computed: mapState('events', ['editedEvent', 'editedEventId', 'eventId', 'editedEvent']),
  data() {

    return {
      persistent: false,
      small: false,
      text: '',
      eid: this.$route.params.id,
      localEditedEvent: {
        eventStyle: 'סוג האירוע',
        organizer: '',
        place: '',
        imgLimit: null,
        date: '',

      },
      eventDate: '',
      all: null,
      options: ['אל תאפשר', 'אפשר'],
      options2: ['חתונה', 'אירוסים', 'חינה', 'בר מצווה',
        ' בת מצווה', ' ברית', ' בריתה', 'אירוע מנהלי', 'אחר']
    }
  },
  methods: {

    ...mapActions('events', ['insertEvent', 'updateEvent', 'setEditEventById']),
    ...mapMutations('events', ['setEditedEvent', 'setEditedEventId', 'setEventId']),
    dateChange(val){
      this.localEditedEvent.date = val
    },
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
      if (this.localEditedEvent.id){
        this.$router.push('/home');
      }else {
        this.$emit('closeDialog')
      }
    },

    async blass() {
      const check = await this.localSetEditedEvent();
      if (check) {
        this.$confetti.start()
        this.persistent = true
        setTimeout(async () => {
          this.$confetti.stop()
          this.persistent = false
          await this.insert()

        }, 2500)
      }
    },
    async insert() {
      const eid = await this.insertEvent();
      await this.$router.push(`/event-page/${eid}`);
    },


    update() {
      // if (!this.localEditedEvent.date) this.localEditedEvent.date = this.eventDate
      this.localSetEditedEvent();
      this.updateEvent(this.localEditedEvent);
      this.goToHome()
    }
  },

  async created() {
    if (this.eid) {
      Object.assign(this.localEditedEvent, this.editedEvent)
      // this.eventDate = this.localEditedEvent.date
    }
  }
}

</script>

<style lang="scss" scoped>
@import "src/styles/quasar.variables";


.bg{
background-color: $accent;
}
.btn-submit {
  width: 100%;
  text-align: center;
  height: 50px;
  font-size: 20px;
  background-color: $primary;
  color: $secondary;
  border-radius: 10px;
}

.background2 {
  width:50vw;
  background-color: #e8e3df;
  //background-color: rgba(255, 255, 255, 0.62) !important;
  color: $primary;
  border-radius: 10px;
  opacity: 1;
}


</style>

