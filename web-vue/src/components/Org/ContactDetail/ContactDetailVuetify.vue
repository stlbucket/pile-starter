<template>
  <div>
    <h1>Name: {{ fullName }}</h1>
    <hr>
    <v-textarea
      :value="JSON.stringify(contact,0,2)"
      auto-grow
    ></v-textarea>
    <!-- <v-tabs
      dark
      slider-color="yellow"
    >
      <v-tab
        key="facility-list"
        ripple
      >
        Facilities
      </v-tab>
      <v-tab-item
        key="facility-list"
      >
        <facility-list
          :facilities="facilities"
        ></facility-list>
      </v-tab-item>
    </v-tabs> -->
  </div>
</template>

<script>
import ContactDetailScript from './ContactDetailScript'
import ContactList from '../ContactList/ContactListVuetify'


export default {
  name: "ContactDetail",
  mixins: [ContactDetailScript],
  components: {
    ContactList
  }
}
</script>
