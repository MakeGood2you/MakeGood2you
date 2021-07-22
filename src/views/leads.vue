<template>
  <div>
    <!--    <p class="leads" dir="rtl"><b>לידים</b></p>-->

    <!--        <q-icon style="display: flex; flex-direction: column; margin: auto; margin-top: 40px" name="people"-->
    <!--                size="56px"/>-->
    <!--        <div class="q-mt-md text-center">-->
    <!--          <p style="font-size: 20px">{{ details }}</p>-->
    <!--        </div>-->
    <TabsLeadList />
    <!--        <div>-->
    <!--          <q-icon name="delete" size="25px" @click="deleteLead(details)"></q-icon>-->
    <!--        </div>-->
    <!--    <q-dialog v-model="persistent" transition-hide="scale">-->
    <!--      <q-card class=" bg-blue-9 text-white" style="width: 300px">-->

    <!--        <q-card-section dir="rtl" style="text-align: center">-->
    <!--          <div class="text-h6">האם תרצה למחוק את הליד?</div>-->
    <!--        </q-card-section>-->

    <!--        <q-card-actions class="bg-white text-blue-9" style="text-align: center">-->
    <!--          <div>-->
    <!--            <q-btn v-close-popup flat v-model="leadData" label="מחק ליד" @click="delLead(leadData)"/>-->
    <!--            <q-btn v-close-popup color="red" flat label="ביטול"/>-->
    <!--          </div>-->
    <!--        </q-card-actions>-->
    <!--      </q-card>-->
    <!--    </q-dialog>-->
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import TabsLeadList from "../components/leads/TabsLeadList";

export default {
  name: "leads",
  components: {TabsLeadList},
  data() {
    return {
      slide: 0,
      information: '',
      arr: [],
      persistent: false,
      leadData: '',
    }
  },
  computed:mapState('leads',['leads']),


  methods: {
    ...mapActions('leads', ['getLeads', 'deleteLeadFromDB']),

    goback() {
      this.$router.push(`/home`)
    },
    async delLead(citrus) {

    },
    deleteLead(params) {

    }
  },
  async created() {
    debugger
    await this.getLeads()
    console.log(this.leads)
    // console.log(this.leads)

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
