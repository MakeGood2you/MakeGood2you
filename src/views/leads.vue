<template>
  <div class="column items-center">
    <h4 class="text-bold q-mb-lg">לידים</h4>
    <TabsLeadList/>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import TabsLeadList from "../components/leads/TabsLeadList";
import {positive} from "../middleware/utils/notify";

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
    await this.getLeads()
    if (!this.leads) {
      this.$q.notify(positive('איו לידים להצגה כרגע'))
      return this.$router.push('/home')
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
