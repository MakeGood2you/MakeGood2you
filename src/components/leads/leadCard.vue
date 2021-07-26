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
        <q-input
            style="width:38%"
            class=""
            v-model="lead.phoneNumber"
            filled
            readonly
            outlined
        >

          <template v-slot:prepend>

            <q-chip v-if="lead.firstName" class="bg-primary text-bold text-white "> קובי
              :
            </q-chip>

          </template>
          <template v-slot:append>
            <div class="cursor-pointer" v-clipboard:copy="lead.phoneNumber"
            >
              <q-icon
                  color="black" @click="copy" size="1.3rem" name="svguse:icons.svg#clipboard"/>
            </div>
          </template>


        </q-input>

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
      <div class="column items-center">
        <span class="text-bold text-subtitle1"> הערות :</span>
        <q-separator class="q-my-sm full-width"/>

        <div class="row wrap">
          <q-chat-message
              class="q-mx-md text-white"
              bg-color="info"
              text-color="black"
              v-for="comment in lead.comments"
              :text="[comment]"
          />
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