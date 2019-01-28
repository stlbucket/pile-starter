<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-actions
    >
      <template slot="items" slot-scope="props">
        <td v-for="column in columns" :key="column.name">
          <router-link v-if="column.routeLink" :to="{ 
            name: column.routeLink.name,
            params: Object.keys(column.routeLink.params).reduce(
              (a, key) => {
                return Object.assign(a, {
                  [key]: props.item[column.routeLink.params[key]]
                })
              }, {}
            )
          }">{{ props.item[column.name] }}</router-link>
          <span v-else>{{ props.item[column.name] }}</span>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "EntityList",
  props: {
    columns: {
      type: Array,
      required: true
    },
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
