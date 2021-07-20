<template>
  <div>
    <q-btn
        class="absolute-top-right back"
        @click="goback"
        icon="home"
        color="black"
        flat
        dense
        label="חזור"
    />
    <p class="leads" dir="rtl"><b>לידים</b></p>
    <q-carousel
        arrows
        infinite
        swipeable
        transition-prev="scale"
        transition-next="scale"
        navigation
        animated
        control-color="white"
        padding
        height="250px"
        class="rounded-borders crosrol"
        v-model="slide"
    >
      <q-carousel-slide
          v-for="(a, index) in arr"
          :key="index"
          :name="index"
      >
        <q-icon style="display: flex; flex-direction: column; margin: auto; margin-top: 40px" name="people"
                size="56px"/>
        <div class="q-mt-md text-center">
          <p style="font-size: 20px">{{ a }}</p>
        </div>
        <div>
          <q-icon name="delete" size="25px" @click="deleteLead(a)"></q-icon>
        </div>
      </q-carousel-slide>
    </q-carousel>
    <q-dialog v-model="persistent" transition-hide="scale">
      <q-card class=" bg-blue-9 text-white" style="width: 300px">

        <q-card-section dir="rtl" style="text-align: center">
          <div class="text-h6">האם תרצה למחוק את הליד?</div>
        </q-card-section>

        <q-card-actions class="bg-white text-blue-9" style="text-align: center">
          <div>
            <q-btn v-close-popup flat v-model="leadData" label="מחק ליד" @click="delLead(leadData)"/>
            <q-btn v-close-popup color="red" flat label="ביטול"/>
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "leads",
  data() {
    return {
      slide: 0,
      information: '',
      arr: [],
      persistent: false,
      leadData: '',
    }
  },

  methods: {
    ...mapActions('leads', ['getLeads', 'deleteLeadFromDB']),

    goback() {
      this.$router.push(`/home`)
    },
    async delLead(citrus) {

      var params = citrus.slice(0, 12);
      await this.deleteLeadFromDB(params)
      this.arr = []
      this.information = await this.getLeads()
      for (var info in this.information) {
        var phone = info
        var name = await this.information[info].name
        const details = phone + ' - ' + name
        await this.arr.push(details)
      }
    },
    deleteLead(params) {
      this.leadData = params
      this.persistent = true
    }
  },
  async created() {
    if (!window.user) {
      await this.$router.push('/')
    }
    this.information = await this.getLeads()
    for (var info in this.information) {
      var phone = info
      var name = await this.information[info].name
      const details = phone + ' - ' + name
      await this.arr.push(details)
    }
  }
}
</script>

<style scoped>
.crosrol {
  width: 40%;
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.61);
  color: #000023;
}

.back {
  margin-right: 10px;
}

.leads {
  background-color: #000023;
  color: antiquewhite;
  display: flex;
  flex-direction: column;
  margin: auto;
  text-align: center;
  width: 40%;
  font-size: 30px;
}

</style>
