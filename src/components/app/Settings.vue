<template>
    <q-btn v-show="user"
           class="absolute-right q-pr-sm"
           icon="settings"
           no-caps
           color="black"
           flat
           dense
           label="הגדרות">
      <q-menu class="">

        <div class="row no-wrap q-pa-md">
          <div class="column">
            <div class="text-h6 q-mb-md ">הגדרות</div>
            <div class="self-end column">

            <q-btn
                   class="self-end"
                   no-caps
                   color="black"
                   flat
                   dense
                   v-model="mobileData">
              <span>התנתקות מהשירות</span><q-icon name="account_circle"></q-icon>
            </q-btn>

            <q-btn
                @click="goEditBusinessDetails"
                class="self-end"
                no-caps
                color="black"
                flat
                dense
                v-model="mobileData">
              <span> פרטי העסק</span><q-icon name="edit"></q-icon>
            </q-btn>
          </div>
          </div>
          <q-separator vertical inset class="q-mx-lg"/>

          <div class="column items-center">
            <q-avatar size="72px">
              <img src="https://cdn.quasar.dev/img/avatar4.jpg">
            </q-avatar>

            <div class="text-subtitle1 q-mt-md q-mb-xs">kobi peretz</div>

            <q-btn
                color="primary"
                label="התנתק"
                push
                size="sm"
                @click="signOut"
                v-close-popup
            />
          </div>
        </div>
      </q-menu>
    </q-btn>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: "Settings",
  data() {
    return {
      mobileData: true,
      bluetooth: false
    }

  },
  computed: mapState('auth', ['user']),
  methods: {
    ...mapActions('auth', ['firebaseLogout']),
    goEditBusinessDetails() {
      this.$router.push('/add-business-details')
    },
    async signOut() {
      await this.firebaseLogout()
      await this.$router.push(`/`)
    },
  }

}
</script>

<style scoped>

</style>