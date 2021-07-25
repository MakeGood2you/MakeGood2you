<template>
      <q-page-container>
        <q-dialog class="dialog" v-model="isShowDialog">
          <AddEvent @closeDialog="isShowDialog=false"/>
        </q-dialog>
        <q-icon
            @click="isShowDialog = true"
            :class="`${!events ?'absolute-center' :'fixed-bottom-right'} mouse-over q-mb-lg q-pa-lg` "
            :size="!events ?'8rem': '9rem'" color="accent"
            name="add_circle_outline">        <div class="text-h5">הוסף אירוע</div>
        </q-icon>
        <TableViewer />

      </q-page-container>
</template>

<script>
import AddEvent from '../components/Home/AddEvent'
import TableViewer from '../components/Home/TableViewer'

import {mapActions, mapMutations, mapState} from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      isShowDialog: false,
      validationNumber: '',
    }
  },

  components: {
    AddEvent, TableViewer,
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('businesses', ['isPay']),
    ...mapState('events', ['events']),
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

<style scoped>
.dialog {
}

</style>
