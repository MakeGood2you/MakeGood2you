<template>
  <q-card  flat bordered class="my-card bg-secondary ">
    <q-dialog v-model="isComment">
      <CommentInput @onSubmit="onSubmit"/>
    </q-dialog>
    <div class="row no-wrap q-py-xs">
      <span class="q-px-md"> נוצר :  {{ new Date(lead.createdTime).toLocaleString().substring(0, 10) }} </span>
      <span> בשעה :  {{ new Date().toLocaleString(lead.createdTime).substring(12,20) }} </span>
    </div>
    <q-card-section class="">
      <div class="row items-center content-between">
        <div class="col">
          <div class="text-subtitle1"><span class="text-bold"> סוג האירוע : </span>{{ lead.eventStyle }}</div>
          <div class="text-subtitle1"><span class="text-bold"> מקום האירוע : </span>{{ lead.eventPlace }}</div>
          <div class="text-subtitle1"><span class="text-bold"> בתאריך : : </span>{{ lead.eventDate }}</div>

        </div>
        <q-btn-dropdown
            class=" q-mx-md"
            color="primary"
            :menu-offset="[60, 5]"
            label="הצג מס פלאפון"
        >
          <div class="row no-wrap justify-between q-pa-sm">
            <div class="cursor-pointer text-subtitle1" v-clipboard:copy="lead.phoneNumber">
              <q-icon
                  color="black" @click="copy" size="1.5rem" name="svguse:icons.svg#clipboard"/>
            </div>
            <span class="text-subtitle1">         {{ lead.phoneNumber }}   </span>
            <span v-if="lead.firstName" class="text-subtitle1 text-bold text-black ">  :  {{ lead.firstName }}</span>



          </div>
        </q-btn-dropdown>

        <div class="col-auto">
          <q-btn color="grey-7" size="1.5rem" round flat icon="more_vert">
            <q-menu dir="rtl" cover auto-close>
              <q-list>
                <q-item clickable>
                  <q-item-section @click="remove()">מחק</q-item-section>
                </q-item>
                <q-item @click="isComment=true" clickable>
                  <q-item-section>הוסף הערה</q-item-section>

                </q-item>
                <q-item @click="moveToOldLeads" clickable>
                  <q-item-section>העבר ללידים ישנים</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
      <q-card-actions class="column items-start">
        <div class="row no-wrap">
          <div class="q-px-md row items-center">


          </div>

        </div>

      </q-card-actions>
      <div class="column ">
        <q-separator class="q-my-sm full-width"/>
        <span class="text-bold text-subtitle1"> הערות :</span>

        <div class="row wrap justify-start">
          <q-list>
            <q-item
                v-for="(comment, key) in lead.comments"
                :key="key"
            >
              <q-item-section side>
                <q-icon
                    color="black" size="1.3rem" name="svguse:icons.svg#left-circle"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ comment }}</q-item-label>
              </q-item-section>
              <q-separator spaced inset/>
            </q-item>
          </q-list>
        </div>
      </div>

    </q-card-section>

  </q-card>
</template>

<script>
import {mapActions} from "vuex";
import {positive} from '../../middleware/utils/notify/'
import CommentInput from "./CommentInput";
export default {
  name: "leadCard",
  components: {CommentInput},
  props: ['lead'],
  data: () => ({
    isComment: false
  }),
  methods: {
    ...mapActions('leads', ['deleteLeadFromDB', 'setComment', 'moveToOldLeadsAction']),
    copy() {
      this.$q.notify(positive('מספר הועתק'))
    },
    remove() {
      this.deleteLeadFromDB(this.lead.phoneNumber)
    },
    onSubmit(comment) {
      this.setComment({lead: this.lead, comment})
      console.log(this.text)
      this.isComment = false
    },
    async moveToOldLeads() {
      await this.moveToOldLeadsAction(this.lead)
    }
  }
}
</script>

<style scoped>

</style>