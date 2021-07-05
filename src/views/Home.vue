<template>
  <div>
    <q-btn
        class="absolute-top-right homePage"
        @click="goLeads"
        icon="people"
        color="black"
        flat
        dense
        label="לידים"
    />
    <q-layout>
      <q-page-container>
        <AddEvent :tableName="'events'"/>
        <TableViewer :tableName="'events'"/>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import AddEvent from '../components/AddEvent'
import TableViewer from '../components/TableViewer'
import EventPage from './EventPage'
import pictureAdded from "./pictureAdded"
import Register from "./Register"
import leads from "./leads"
import {mapActions} from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      validationNumber: '',
      informationHome: ''
    }
  },
  components: {
    AddEvent, TableViewer, EventPage, pictureAdded, Register, leads
  },
  methods: {
    ...mapActions('events', ['checkPackage', 'setPackagePayment', 'getLeads', 'checkLastDayForUse', 'checkPayTrue']),

    async goLeads() {
      this.informationHome = await this.getLeads()
      console.log(this.informationHome)
      if (this.informationHome === null) {
        alert('אין לידים להציג')
      } else {
       await this.$router.push('leads')
      }
    }
  },
  async created() {
    // todo: check date validation (if validation exist keep home if not: set limited date for use)
    const pay = await this.checkPayTrue()
    if (pay===false){
      await this.$router.push('/payment')
    }
    if (!window.user) {
      await this.$router.push('/')
    }

    const pack = await this.checkPackage()

    if (pack === 'month') {
      this.validationNumber = 37
    }
    if (pack === 'halfYear') {
      this.validationNumber = 194
    }
    if (pack === 'year') {
      this.validationNumber = 395
    }

    const valid = await this.checkLastDayForUse(this.validationNumber)
    if (valid === false) {
      await this.$router.push('/payment')
    }
  }
}

</script>

<style>
.homePage {
  margin-top: 8px;
  margin-right: 100px;
}
</style>
