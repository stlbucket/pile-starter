<template>
  <div>
    <contact-detail-component
      :contact="contact"
    ></contact-detail-component>
  </div>
</template>

<script>
import ContactDetailViewScript from './ContactDetailViewScript'
import ContactDetailComponent from '@/components/Org/ContactDetail/ContactDetailVuetify'


export default {
  name: "ContactDetailView",
  mixins: [ContactDetailViewScript],
  components: {
    ContactDetailComponent
  }
}
</script>
