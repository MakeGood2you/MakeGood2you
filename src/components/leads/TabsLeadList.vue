<template>
  <div dir="rtl" class="column items-center">
    <div class="q-pa-md  ">
      <q-card class="">
        <q-tabs
            v-model="tab"
            dense
            class="text-grey "
            active-color="primary"
            indicator-color="primary"
            align="justify"
        >
          <q-tab name="newLeads" label="לידים חדשים"/>
          <q-tab name="oldLeads" label="לידים ישנים"/>

        </q-tabs>

        <q-separator/>

        <q-tab-panels v-if="leads" class="container" v-model="tab" animated>
          <q-tab-panel name="newLeads" class="q-pa-none ">

           <leads-list :isNewLeads="true"/>
          </q-tab-panel>

          <q-tab-panel name="oldLeads">
            <leads-list :isNewLeads="false"/>
          </q-tab-panel>

        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import LeadsList from "./leadsList";

export default {
  name: "TabsLeadList",
  components: {LeadsList},
  data: () => ({
    tab: 'newLeads',
    innerTab: 'lastWeek',
    splitterModel: 10
  }),
  computed: {
    ...mapState('leads', ['leads']),
    newLeads() {
      return this.leads.filter(lead => lead.isNewLead)
    },
    oldLeads() {
      return this.leads.filter(lead => !lead.isNewLead)
    }
  },
  created() {
  }
}
</script>

<style scoped>
.container {
  width: 70vw;
  height: 70vh;
}

</style>