<template>
  <div>
    <q-list bordered>
      <q-expansion-item

          v-for="(lead,index) of leads"
          :key="index"
          class="full-width"
          group="newLeads"
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
import {mapGetters, mapState} from "vuex";
import LeadCard from "./leadCard";

export default {
  props: ['isNewLeads'],
  name: "leadsList",
  components: {LeadCard},
  data: () => ({
  }),
  computed: {
    ...mapState('leads', ['leads']),
    ...mapGetters('leads', ['getFilterLeads']),
    leads() {
      return this.getFilterLeads(this.isNewLeads)
    },
  },
  created() {

  },
  watch: {
    leads() {
      this.localLeads = [...this.leads]

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