<template>
  <div>
    <contact-list-component
      :contacts="contacts"
    ></contact-list-component>
  </div>
</template>

<script>
import ContactListViewScript from './ContactListViewScript'
import ContactListComponent from '@/components/Org/ContactList/ContactListVuetify'

export default {
  name: "ContactList",
  mixins: [ContactListViewScript],
  components: {
    ContactListComponent
  }
}
</script>
