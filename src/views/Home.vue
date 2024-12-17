<template>
      <q-page-container>
        <q-dialog style="width: 100vh" class="dialog" v-model="isShowDialog">
          <AddEvent  @closeDialog="isShowDialog=false"/>
        </q-dialog>
        <q-icon
            @click="isShowDialog = true"
            :class="`${!events ?'absolute-center' :'fixed-bottom-right'} z-in mouse-over q-mb-lg q-pa-lg` "
            :size="!events ?'8rem': '9rem'" color="primary"
            name="add_circle_outline" >
          <br>
          <h5  ><p>צור אירוע חדש</p></h5>
        </q-icon>

        <TableViewer />
      </q-page-container>
</template>

<script>
import AddEvent from '../components/Home/AddEvent'
import TableViewer from '../components/Home/TableViewer'
import Settings from '../components/app/Settings'
import SimpleLogo from '../components/app/Logos/SimpleLogo'

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
    AddEvent, TableViewer,Settings,SimpleLogo
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('businesses', ['isPay']),
    ...mapState('events', ['events']),
  },
  methods: {
    ...mapMutations('auth', ['setUser','setIsUserExist']),
  },
}

</script>

<style scoped>
.dialog {
  width: 100vh
}

</style>
