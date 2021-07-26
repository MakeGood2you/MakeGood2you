<template>
  <q-list bordered>
    <q-expansion-item
        group="somegroup"
        :icon="icon"
        :label="label"
        header-class="text-primary"
    >
      <component :is="child_component"> Something else</component>

    </q-expansion-item>
  </q-list>
</template>

<script>
export default {
  name: "ListAccordionMode"
}
</script>

<style scoped>

</style>