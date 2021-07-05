<template>
  <div>
    <AddItem :item="item" :tableName="tableName"></AddItem>
  </div>
</template>

<script>
import AddItem from "../components/AddEvent";
import firebaseDatabase from '../middleware/firebase/database'
import TableViewer from '../components/TableViewer'


export default {
  name: "Item",
  components: {
    AddItem, TableViewer
  },
  data: function () {
    return {
      item: {},
      tableName: 'events',
      eventId: null,
    }
  },
  methods: {
    getItemById() {
      firebaseDatabase.getItemById({entity: this.tableName, id: this.eventId}).then((res) => {
        this.item = res
      })
    }
  },

  created() {
    this.eventId = this.$route.params.id
    this.getItemById();
  },

}

</script>

<style scoped>

</style>