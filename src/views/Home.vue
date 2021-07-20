<template>
    <q-layout>
      <q-page-container>
        <q-dialog v-model="isClicked">
          <AddEvent/>
        </q-dialog>
        <q-icon @click="isClicked = true" class="absolute-center" size="8rem" color="primary" name="add_circle_outline"></q-icon>
        <TableViewer/>

      </q-page-container>
    </q-layout>
</template>

<script>
import AddEvent from '../components/Home/AddEvent'
import TableViewer from '../components/Home/TableViewer'

import {mapActions, mapMutations, mapState} from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      isClicked:false,
      validationNumber: '',
    }
  },

  components: {
    AddEvent, TableViewer,
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('businesses', ['isPay']),
  },
  methods: {
    ...mapMutations('auth', ['setUser']),
  },
  created() {
    // const user = JSON.parse(localStorage.getItem('user'))
    // user ? this.setUser(user) : this.$router.push('/')
    // this.isPay ? null : this.$router.push('/payment')
  }
}

</script>

<style>
.homePage {
  margin-top: 8px;
  margin-right: 100px;
}
</style>
