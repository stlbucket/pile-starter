<template>
  <entity-detail-vuetify
    :fields="fields"
    :entity="contact"
  ></entity-detail-vuetify>
</template>

<script>
import ContactDetailScript from './ContactDetailScript'
import EntityDetailVuetify from '@/components/_common/EntityDetailVuetify'

export default {
  name: "ContactDetail",
  mixins: [ContactDetailScript],
  components: {
    EntityDetailVuetify
  },
  data () {
    return {
      fields: [
        {
          name: "firstName",
          label: "First Name"
        },
        {
          name: "lastName",
          label: "Last Name"
        },
        {
          name: "email",
          label: "Email"
        },
        {
          name: "cellPhone",
          label: "Cell Phone"
        },
        {
          name: "officePhone",
          label: "Office Phone"
        },
        {
          name: "title",
          label: "Title"
        },
        {
          name: "nickname",
          label: "Nickname"
        },
      ]
    }
  }
}
</script>
