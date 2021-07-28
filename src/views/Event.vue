<template>
  <div>
    <AddItem v-if="editedEvent"></AddItem>
  </div>
</template>

<script>
import AddItem from "../components/Home/AddEvent";
import {mapActions, mapState} from 'vuex'

export default {
  name: "Event",
  components: {
    AddItem
  },
  computed:{
    ...mapState('events',['editedEvent']),
},
  data: function () {
    return {
      item: {},
      tableName: 'events',
      eid:this.$route.params.id,
    }
  },
  methods:{
    ...mapActions('events', ['setEditEventById'])
  },
async created() {
   if (this.eid){
     await this.setEditEventById(this.eid)
   }
}
}

</script>

<style scoped>

</style>