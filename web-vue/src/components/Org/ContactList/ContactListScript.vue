<script>

export default {
  name: "ContactListScript",
  props: {
    contacts: {
      type: Array,
      required: true
    }
  },
  components: {
  },
  methods: {
  },
  computed: {
    items () {
      return this.contacts.map(
        contact => {
          const organization = contact.organization || {
            name: 'N/A'
          }

          const location = contact.location || {
            city: 'N/A'
          }

          return {
            ...contact,
            organizationName: organization.name,
            city: location.city,
            fullName: `${contact.firstName} ${contact.lastName}`
          }
        }
      )
    }
  },
  data () {
    return {
    }
  }
}
</script>
