<template>
  <div>
    <q-list bordered>
      <q-expansion-item

          v-for="lead of localLeads"
          v-if="!isOldLeads && lead.isNewLead"
          group="somegroup"
          icon="person"
          :label="lead.firstName"
          header-class="text-primary"
      >
        <lead-card :lead="lead"/>

      </q-expansion-item>
    </q-list>
        <q-list bordered>

        <q-expansion-item

            v-for="lead of localLeads"
            v-if="isOldLeads && !lead.isNewLead"
            group="isOldLeads"
            icon="person"
            :label="lead.firstName"
            header-class="text-primary"
        >
          <lead-card :lead="lead"/>
        </q-expansion-item>
    </q-list>
  </div>
</template>

<script>
import {mapState} from "vuex";
import LeadCard from "./leadCard";

export default {
  props: ['isOldLeads'],
  name: "leadsList",
  components: {LeadCard},
  data: () => ({
    localLeads: []
  }),
  computed: mapState('leads', ['leads']),
  created() {
    this.localLeads = [...this.leads]
  },
  watch: {
    leads() {
      console.log(this.leads)
      this.localLeads = [...this.leads]

      debugger
    }
  }
}

</script>

<style lang="scss" scoped>
@import "src/styles/quasar.variables";
.card-container {
  width: 100%;
  background-color: $secondary;
}
</style>