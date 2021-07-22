<template>
  <q-list bordered>
    <q-expansion-item
        v-for="lead of leads"
        group="somegroup"
        icon="person"
        :label="lead.firstName "
        header-class="text-primary"
    >
     <lead-card :lead="lead"/>
    </q-expansion-item>
  </q-list>
</template>

<script>
import {mapState} from "vuex";
import LeadCard from "./leadCard";

export default {
  name: "leadsList",
  components: {LeadCard},
  computed: mapState('leads', ['leads']),

}
</script>

<style lang="scss" scoped>
@import "src/styles/quasar.variables";
.card-container {
  width: 100%;
  background-color: $secondary;
}
</style>