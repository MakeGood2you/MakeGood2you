<template dir="rtl">
  <div
      v-if="isEventExist"
      class="q-pa-md">
    <q-table
        v-if="events.length"
        :filter="filter"
        :rows-per-page-options="[]"
        wrap-cells
        :columns="columns"
        :data="events"
        binary-state-sort
        class="table1"
        row-key="name"
        style="direction: rtl; padding: 20px 0px"
    >
      <template v-slot:top-left>
          <q-input
              outlined  debounce="300" v-model="filter" placeholder="  חפש אותי כאן  ">
            <template v-slot:prepend>
              <q-icon name="search"/>
            </template>
          </q-input>
      </template>
      <template v-slot:header="props">
        <q-tr :props="props" class="table-head-row">
          <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              class="table-header"
          >
            <q-tooltip v-if="col.name !== 'Qrcode' && col.name !== 'actions'"
                       anchor="top end" self="center middle" transition-show="rotate" transition-hide="flip-left">
              {{ col.title }}
            </q-tooltip>
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props" dir="ltr">
        <q-tr :props="props">
          <q-td key="organizer" :props="props" @click="goToEvent(props.row.id)">
            <div class="text-pre-wrap">{{ props.row.organizer }}</div>
          </q-td>
          <q-td key="eventStyle" :props="props" @click="goToEvent(props.row.id)"> {{ props.row.eventStyle }}</q-td>
          <q-td key="date" :props="props" @click="goToEvent(props.row.id)">{{ reverseString(props.row.date) }}</q-td>
          <q-td key="presents" :props="props" @click="goToEvent(props.row.id)">{{ props.row.presents }}</q-td>
          <q-td key="place" :props="props" @click="goToEvent(props.row.id)">{{ props.row.place }}</q-td>
          <q-td key="imgLimit" :props="props" @click="goToEvent(props.row.id)">{{ props.row.imgLimit }}</q-td>
          <q-td key="usersPermission" :props="props">

            <q-btn
                class="items-center"
                :props="props"
                flat
                :color="props.row.isOpen ? 'green' : 'red'"
                v-if="getPermission(props.row) && '-'"
                @click="closePermission(props.row)"
            >
              <span class="text-center">{{ props.row.isOpen ? 'הרשאות פתוחות' : 'הרשאות סגורות' }}</span>
            </q-btn>
            <span v-else>-</span>
          </q-td>
          <q-td key="Qrcode" class="text-center" :props="props">
            <q-btn
                :props="props"
                @click="getOneCode(props.row)"
                icon="qr_code_scanner"
                class="qr"
                v-if="!props.row.QR"
                flat
            />
            <div>
              <canvas
                  class="qr cursor-pointer"
                  :props="props"
                  @click="getOneCode(props.row)"
                  :id="`${props.row.id}`"
                  v-if="props.row.QR"

              />
              <p :props="props" class="copy cursor-pointer" @click="copy" v-if="props.row.QR"
                 v-clipboard:copy="props.row.canvas"
                 style="text-align: center; font-size: 15px; color: #000090">העתק קישור</p>
            </div>
          </q-td>
          <q-td key="actions" :props="props" >
            <q-btn class="trash-hover items-center" icon="delete" flat @click="del(props.row)"></q-btn>
            <q-dialog v-model="persistent" transition-hide="scale">
              <q-card class=" bg-blue-9 text-white" style="width: 300px">

                <q-card-section :props="props" dir="rtl" style="text-align: center">
                  <div :props="props" class="text-h6" v-model="selected_data.id">האם תרצה למחוק את האירוע?</div>
                </q-card-section>

                <q-card-actions class="bg-white text-blue-9" style="text-align: center">
                  <div>
                    <q-btn :props="props" v-close-popup flat label="מחק אירוע" @click="remove(selected_data.id)"/>
                    <q-btn v-close-popup color="red" flat label="ביטול"/>
                  </div>
                </q-card-actions>
              </q-card>
            </q-dialog>
          </q-td>
        </q-tr>
      </template>
    </q-table>

  </div>
</template>


<script>
import {mapActions, mapMutations, mapState} from 'vuex'
import {Notify, Quasar} from "quasar";
import Vue from 'vue';
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard);
Vue.use(Quasar, {
  plugins: {
    Notify
  },
  config: {
    notify: { /* look at QUASARCONFOPTIONS from the API card (bottom of page) */}
  }
})

export default {
  name: "TableViewer",
  props: ['tableName'],

  data() {
    return {
      filter: '',
      isEventExist: true,
      text: '',
      qrBool: false,
      selected_data: '',
      data: '',
      canvas: false,
      testingCode: "1234",
      message: 'Copy These Text',
      trueOrFalse: '',
      skip: false,
      isTheSameDate: false,
      persistent: false,
      usersPermission: false,
      btnPermission: '',
      columns: [

        {
          name: 'organizer',
          title: ' מיון לפי א עד ת',
          align: 'center',
          label: 'בעל האירוע',
          field: 'organizer',
          sortable: true
        },
        {
          name: 'eventStyle',
          title: ' מיון לפי אירוע',
          align: 'center',
          label: 'סוג אירוע',
          field: 'eventStyle',
          sortable: true
        },
        {
          name: 'date', title: ' מיון לפי תאריך',
          align: 'center', label: 'מועד האירוע', field: 'date', sortable: true
        },
        {
          name: 'place', title: ' מיון לפי מקום',
          align: 'center', label: 'מקום האירוע', field: 'place', sortable: true
        },
        {
          name: 'imgLimit', title: ' מיון מהקטן / לגדול',
          align: 'center', label: 'הגבלת תמונות', field: 'imgLimit', sortable: true
        },
        {
          name: 'usersPermission', title: ` מיון לפי אירועים פתוחים / סגורים`,
          align: 'center', label: 'הרשאות', field: 'usersPermission', sortable: true
        },
        {name: 'Qrcode', align: 'center', label: 'QRcode', field: 'Qrcode'},
        {name: 'actions', label: 'מחיקת אירוע', align: 'center', field: 'actions'},
      ],
    }
  },

  computed: {
    ...mapState('events', ['editedEventId', 'document', 'qrT', 'events', 'contacts']),
  },

  methods: {

    ...mapActions('events', ['deleteEvent', 'getEvents', 'setQrF', 'setQrTF', 'changePermissionValue']),
    ...mapMutations('events', ['setEventId', 'setEvent']),

    ///updated functions///
    async closePermission(params) {
      await this.changePermissionValue(params.id)
    },

    getPermission(params) {
      let year = new Date().toLocaleString('en', {year: 'numeric'});
      let month = new Date().toLocaleString('en', {month: '2-digit'});
      let day = new Date().toLocaleString('en', {day: '2-digit'});
      var todayDate = `${year}-${month}-${day}`

      if (todayDate != params.date) {
        return false
      }
      return true
    },

    async getOneCode(params) {
      await this.setQrTF(params.id)
      this.skip = true
      await this.qrcode()
    },


    ///old functions///

    qrcode() {
      const self = this
// Require the package
      const QRCode = require('qrcode')

// Creating the data
      for (let event of self.events) {
        const data = event.canvas
        const id = event.id
// Converting the data into String format
        let stringdata = JSON.stringify(data)

// Print the QR code to terminal
        QRCode.toString(stringdata, {type: 'terminal'},
            function (err, QRcode) {
              if (err) return console.log("error occurred")
              // Printing the generated code
            })

// Converting the data into base64
        QRCode.toDataURL(stringdata, function (err, url) {
          if (err) return console.log("error occurred")

          // Printing the code
        })

        // Converting the data into base64
        QRCode.toCanvas(document.getElementById(id), stringdata, {type: 'terminal'},
            function (err, code) {
              if (err) return console.log("error occurred")
            })
        if (!this.skip) {
          this.setQrF(id)
        }
      }
    },
    remove(id) {
      this.deleteEvent(id);
    },
    goToEvent(id) {
      this.setEventId(id)
      this.setEvent(id)
      this.$router.push(`/event-page/${id}`);
    },
    del(row) {
      this.persistent = true
      this.selected_data = row;
    },
    copy() {
      this.$q.notify({
        message: 'קישור הועתק',
        color: 'black'
      })
    },
    reverseString(str) {
      const splitString = str.split("-");
      splitString.splice(1, 0, '-')
      splitString.splice(3, 0, '-')
      const reverseArray = splitString.reverse();
      const joinArray = reverseArray.join("");
      return joinArray;
    }
  },
  async created() {
    await this.getEvents()
    await this.qrcode()
  },
}

</script>

<style scoped>

.table1 {
  background-color: rgb(255, 255, 255);
  filter: opacity(80%);
}

.q-table tbody td {
  font-size: 16px;
}


.qr {
  display: flex;
  flex-direction: inherit;
  margin: auto;
}

.qr:hover {
  color: deepskyblue;
}

.copy:hover {

  filter: opacity(55%);
}


q-th {
  background-color: red;
}

.table-header {
  font-size: 16px;
  font-weight: bold;
}

.trash-hover:hover {
  color: red;
}

</style>

