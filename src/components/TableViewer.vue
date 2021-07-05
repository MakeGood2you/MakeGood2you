<template dir="rtl">

  <div class="q-pa-md">
    <q-table
        :columns="columns"
        :data="events"
        binary-state-sort
        class="table1"
        row-key="name"
        style="direction: rtl; padding: 20px 0px"

    >

      <template v-slot:header="props">
        <q-tr :props="props" class="table-head-row">
          <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              class="table-header"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props" dir="ltr">
        <q-tr :props="props">
          <q-td key="organizer" :props="props" @click="goToEvent(props.row.id)">{{ props.row.organizer }}</q-td>
          <q-td key="eventStyle" :props="props" @click="goToEvent(props.row.id)"> {{ props.row.eventStyle }}</q-td>
          <q-td key="date" :props="props" @click="goToEvent(props.row.id)">{{ reverseString(props.row.date) }}</q-td>
          <q-td key="presents" :props="props" @click="goToEvent(props.row.id)">{{ props.row.presents }}</q-td>
          <q-td key="place" :props="props" @click="goToEvent(props.row.id)">{{ props.row.place }}</q-td>
          <q-td key="imgLimit" :props="props" @click="goToEvent(props.row.id)">{{ props.row.imgLimit }}</q-td>
          <q-td key="Qrcode" class="text-center" :props="props">
            <q-btn :props="props" @click="qrBool = !qrBool" v-show="qrBool === false" class="qr-hover"
                   icon="qr_code_scanner" flat></q-btn>
            <div :props="props" v-show="qrBool" @click="qrBool = !qrBool">
              <canvas class="qr" :id="`${props.row.id}`"></canvas>
              <p class="copy" @click="copy" :props="props" v-clipboard:copy="props.row.canvas"
                 style="text-align: center; font-size: 15px; color: #000090">העתק קישור</p>
            </div>
          </q-td>
          <q-td key="actions" :props="props">
            <q-btn class="trash-hover" icon="delete" flat @click="del(props.row)"></q-btn>
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
import {mapState, mapActions, mapMutations} from 'vuex'
import {event, Notify, Quasar} from "quasar";
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
      qrBool: false,
      selected_data: '',
      data: '',
      testingCode: "1234",
      message: 'Copy These Text',
      persistent: false,
      columns: [

        {name: 'organizer', align: 'center', label: 'בעל האירוע', field: 'organizer'},
        {name: 'eventStyle', align: 'center', label: 'סוג אירוע', field: 'eventStyle', sortable: true},
        {name: 'date', align: 'center', label: 'מועד האירוע', field: 'date', sortable: true},
        {name: 'place', align: 'center', label: 'מקום האירוע', field: 'place', sortable: true},
        {name: 'imgLimit', align: 'center', label: 'הגבלת תמונות', field: 'imgLimit'},
        {name: 'Qrcode', align: 'center', label: 'QRcode', field: 'Qrcode'},
        {
          name: 'actions',
          required: true,
          label: 'מחיקת אירוע',
          align: 'center',
          field: 'actions',
          sortable: true,
        },
      ],
    }
  },

  computed: {
    ...mapState('events', ['editedEventId', 'events', 'contacts']),
  },

  methods: {
    ...mapActions('events', ['deleteEvent', 'getEvents']),
    ...mapMutations('events', ['setEventId']),


    qrcode() {

// Require the package
      const QRCode = require('qrcode')

// Creating the data
      for (let event in this.events) {
        const data = (this.events[event].canvas)
        const id = this.events[event].id
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
      }
    },

    remove(id) {
      this.deleteEvent(id);
    },
    goToEvent(id) {
      this.setEventId(id)
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
      debugger
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
  }
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

.qr-hover:hover {
  color: deepskyblue;
}
</style>

