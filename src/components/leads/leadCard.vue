<template>
  <q-card flat bordered class="my-card bg-grey-1">
    <q-dialog v-model="isComment">
      <CommentInput @onSubmit="onSubmit"/>
    </q-dialog>
    <div class="row no-wrap q-py-lg">
      <span class="q-px-md"> נוצר :  {{ new Date(lead.createdTime).toISOString().substring(0, 10) }} </span>
      <span> בשעה :  {{ new Date(lead.createdTime).toISOString().substring(11, 19) }} </span>
    </div>
    <q-card-section>
      <div class="row items-center content-between">
        <div class="col">
          <div class="text-h6">סוג האירוע : {{ lead.eventStyle }}</div>
          <div class="text-h6">מקום האירוע :{{ lead.eventPlace }}</div>
          <div class="text-h6"> בתאריך : {{ lead.eventDate }}</div>
        </div>

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
          <div class="bg-secondary q-px-md row items-center">
            <q-chip v-if="lead.firstName" class="bg-accent text-white q-pa-md q-mr-md"> {{ lead.firstName }}</q-chip>

            {{ lead.phoneNumber }}
          </div>
          <q-btn class="text-white cursor-pointer" @click="copy()"
                 v-clipboard:copy="lead.phoneNumber" color="accent">העתק
          </q-btn>
        </div>

      </q-card-actions>

      הערות : <br>
      <span v-for="comment in lead.comments">
        {{ comment }}
      </span>
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
      this.$q.notify(positive('קישור הועתק'))
    },
    remove() {
      this.deleteLeadFromDB(this.lead.phoneNumber)
    },
    onSubmit(comment) {
      const options = {comment, uid: this.lead.uid, phoneNumber: this.lead.phoneNumber, cid: new Date().getTime()}
      this.setComment(options)
      console.log(this.text)
      this.isComment = false
    },
    async moveToOldLeads() {
      let isNewLead = !this.lead.isNewLead
      const options = {isNewLead, uid: this.lead.uid, phoneNumber: this.lead.phoneNumber, cid: new Date().getTime()}

      await this.moveToOldLeadsAction(options)
    }
  }
}
</script>

<style scoped>

</style>