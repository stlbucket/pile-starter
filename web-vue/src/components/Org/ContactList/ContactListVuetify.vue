<template>
  <div>
    <entity-list-vuetify
      :headers="headers"
      :items="items"
      :columns="columns"
    ></entity-list-vuetify>
  </div>
</template>

<script>
import ContactListScript from './ContactListScript'
import EntityListVuetify from '../../_common/EntityListVuetify'

export default {
  name: "ContactList",
  mixins: [ContactListScript],
  components: {
    EntityListVuetify
  },
  data () {
    return {
      headers: [
        { text: 'Name', value: 'fullName' },
        { text: 'Email', value: 'email' },
        { text: 'City', value: 'city' },
        { text: 'Organization', value: 'organizationName' },
      ],
      columns: [
        { 
          name: 'fullName',
          routeLink: { 
            name: "contact-detail", 
            params: {
              id: 'id'
            }
          } 
        },
        { name: 'email' },
        { name: 'city' },
        { name: 'organizationName' },
      ]
    }
  } 
}
</script>
