<template>
  <q-list bordered>
    <q-expansion-item
        group="somegroup"
        :icon="icon"
        :label="label"
        header-class="text-primary"
    >
      <component v-bind:is="currentCardComponent"></component>
    </q-expansion-item>
  </q-list>
</template>

<script>
export default {
  name: "ListAccordionMode",
  props:['currentCardComponent'],
  data: () =>({

  })
}
</script>

<style scoped>

</style>