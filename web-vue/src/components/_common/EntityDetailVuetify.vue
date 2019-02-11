<template>
  <v-card>
    <v-text-field
      v-for="field in fields"
      :key="field.name"
      disabled 
      :label="field.label" 
      :value="entity[field.name]"
    ></v-text-field>
  </v-card>
</template>

<script>
export default {
  name: "EntityDetailVuetify",
  props: {
    fields: {
      type: Array,
      required: true
    },
    entity: {
      type: Object,
      required: true
    }
  }
}
</script>
