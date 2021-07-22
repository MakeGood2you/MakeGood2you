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

        <q-tab-panels class="container" v-model="tab" animated>
          <q-tab-panel name="newLeads" class="q-pa-none ">

            <h4 class="text-center text-bold">לידים חדשים</h4>
           <leads-list/>
          </q-tab-panel>

          <q-tab-panel name="oldLeads">
            <div class="text-h6">לידים ישנים</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
  computed:mapState('leads',['leads']),
created() {
  console.log(this.leads)
}
}
</script>

<style scoped>
.container {
  width: 70vw;
  height: 70vh;
}
div{
  /*overflow: hidden;*/
}
</style>